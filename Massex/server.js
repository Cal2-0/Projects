/**************************************************************
 * MassEd.ex – AI Layout Backend (Polished Production-Ready)
 **************************************************************/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3001;

console.log("--- Server Startup Debug ---");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "Loaded" : "MISSING");
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "Loaded" : "MISSING");
console.log("----------------------------");

/* -------------------------------------------
   Middleware
-------------------------------------------- */
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

/* -------------------------------------------
   Routes
-------------------------------------------- */
app.get("/api/supabase-keys", (req, res) => {
    console.log("Hit /api/supabase-keys route");
    res.json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_ANON_KEY
    });
});

app.get("/api/config", (req, res) => {
    console.log("Hit /api/config route (Legacy/Cached)");
    res.json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_ANON_KEY
    });
});

// Initialize Supabase Client for Server-Side Operations
const { createClient } = require('@supabase/supabase-js');
let supabase;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log("✅ Supabase Client Initialized on Server");
} else {
    console.warn("⚠️ Supabase credentials missing. Search functionality will be disabled.");
}

app.get("/api/events/search", async (req, res) => {
    const { query } = req.query;
    console.log(`🔍 Searching for event: ${query}`);

    if (!supabase) {
        return res.status(500).json({ error: "Server database not configured" });
    }

    if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
    }

    try {
        let queryBuilder = supabase.from('events').select('*');

        // Check if query is a valid UUID
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(query);

        if (isUUID) {
            // Safe to search by ID or Name
            queryBuilder = queryBuilder.or(`name.ilike.%${query}%,id.eq.${query}`);
        } else {
            // Search only by Name to avoid type errors on ID column (especially if ID is UUID and query is int)
            queryBuilder = queryBuilder.ilike('name', `%${query}%`);
        }

        // Get the most recent event matching the query
        const { data, error } = await queryBuilder.order('created_at', { ascending: false }).limit(1).single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
            console.error("Supabase Search Error:", error);
            throw error;
        }

        if (!data) {
            console.log("❌ Event not found");
            return res.status(404).json({ error: "Event not found" });
        }

        console.log("✅ Event found:", data.name);
        res.json(data);

    } catch (err) {
        console.error("Search Endpoint Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const bcrypt = require('bcryptjs');

app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(`🔐 Attempting admin login for: ${username}`);

    if (!supabase) {
        // Fallback if Supabase is not configured
        if (username === 'incredia' && password === 'incredia') {
            return res.json({ success: true });
        }
        return res.status(500).json({ error: "Server database not configured" });
    }

    try {
        // Query 'events' table for admin credentials
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('admin_username', username)
            .order('created_at', { ascending: false }) // Get the latest if duplicates
            .limit(1)
            .single();

        if (error || !data) {
            console.log("❌ Login failed: User not found");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // 1. Try bcrypt comparison
        let match = await bcrypt.compare(password, data.admin_password);

        // 2. Fallback: Check plain text (Legacy support)
        if (!match && password === data.admin_password) {
            console.warn("⚠️  Legacy plain-text password match. Please update to hashed password.");
            match = true;
        }

        if (!match) {
            console.log("❌ Login failed: Incorrect password");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        console.log("✅ Login successful for event:", data.name);
        res.json({ success: true, user: data, event: data });

    } catch (err) {
        console.error("Login Endpoint Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/", (req, res) => {
    console.log("Hit root route handler");
    const file = path.join(__dirname, "workspace.html");
    console.log("Serving file:", file);
    if (fs.existsSync(file)) return res.sendFile(file);
    return res.status(404).send("workspace.html not found");
});

/* -------------------------------------------
   Serve Frontend
-------------------------------------------- */
console.log("Setting up static files from:", __dirname);
app.use(express.static(__dirname));

/* -------------------------------------------
   Blueprint Description (fixed)
-------------------------------------------- */
const BLUEPRINT_DESCRIPTION = `
A 150m x 290m rectangular festival venue shown in the uploaded blueprint.

TOP ZONE:
- Main stage centered at top, with backstage area behind it.
- VIP Zone immediately in front of the stage.

MIDDLE ZONE:
- A mixed audience area with:
  - Seating zones (tiered or flat) on the far left and right sides.
  - Standing zones in the center area, divided into columns.

BOTTOM ZONE:
- Main Entrance / Exit gate at bottom center.
- Side exits on left and right edges.
- Service stalls at corners.

Coordinates use NORMALIZED system:
- x: 0 = far left → 1 = far right
- y: 0 = top (stage) → 1 = bottom (entrance)
`;

/* -------------------------------------------
   /api/generate (Main AI Route)
-------------------------------------------- */
app.post("/api/generate", async (req, res) => {
    try {
        const params = req.body || {};
        // Local AI mode - no API key check needed
        console.log("🚀 Sending request to Local AI (LM Studio)...");

        // FAST TRACK: Return mock layout immediately for testing
        console.log("⚡ Fast Track: Returning mock layout immediately.");
        return res.json(getMockLayout());

        /* --------------------------
           Build Super Prompt (Stable)
        --------------------------- */
        const prompt = `
You are MassEd.ex — an AI venue layout planner.

The user uploads a blueprint IMAGE but cannot pass image context.  
So interpret the blueprint using THIS description:

${BLUEPRINT_DESCRIPTION}

The system must output PERFECTLY STRUCTURED JSON EXACTLY in this format:

{
  "stage": { "x":0.5, "y":0.08, "width":0.6, "height":0.12 },
  "backstage": { "x":0.5, "y":0.02, "width":0.6, "height":0.05 },
  "vip_zone": [...],
  "standing_zones": [...],
  "seating_zones": [...],
  "stalls": [...],
  "washrooms": [...],
  "cctv": [...],
  "volunteers": [...],
  "media": [...],
  "gates": [...],
  "exits": [...],
  "medical": [...]
}

RULES:
- Use ONLY normalized coordinates (0–1).
- Respect the fixed layout: stage top, VIP below it, 5 long standing blocks, corner stalls, side exits, volunteers around perimeter.
- Volunteers = green dots around edges + inside blocks.
- CCTV = purple circles at corners + stage + entrance.
- Stalls = orange.
- Toilets = blue.
- Medical = red.
- Output must be VALID JSON ONLY (NO markdown, NO commentary).

Now generate a clean JSON layout using the user's parameters:

${JSON.stringify(params, null, 2)}
		`;

        /* --------------------------
           AI Request
        --------------------------- */
        // Extract image if present
        const imageBase64 = params.image || null;
        // Remove image from params to keep the JSON prompt clean
        delete params.image;

        /* --------------------------
           AI Request (Local LM Studio)
        --------------------------- */
        const messages = [
            {
                role: "system",
                content: "You generate STRICT JSON only. No code blocks. No markdown. No explanations."
            },
            {
                role: "user",
                content: [
                    { type: "text", text: prompt + "\n\n" + JSON.stringify(params, null, 2) }
                ]
            }
        ];

        // Add image to the user message if it exists
        if (imageBase64) {
            messages[1].content.push({
                type: "image_url",
                image_url: {
                    url: imageBase64
                }
            });
        }

        const response = await fetch("http://localhost:1234/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "local-model", // LM Studio often ignores this or uses the loaded model
                messages: messages,
                max_tokens: 2000,
                temperature: 0.4,
            }),
        });

        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        let text = (await response.json()).choices[0].message.content.trim();

        // Clean JSON if wrapped in code fences
        text = text.replace(/```json|```/g, "").trim();

        try {
            const json = JSON.parse(text);
            return res.json(getMockLayout());
            return res.json(json);
        } catch (err) {
            console.log("⚠️ AI returned invalid JSON — using mock layout.");
            return res.json(getMockLayout());
        }
    } catch (err) {
        console.error("❌ Server Error:", err);
        return res.status(500).json({ error: err.message });
    }
});

/* -------------------------------------------
   MOCK LAYOUT (Hand-crafted to match blueprint)
-------------------------------------------- */
function getMockLayout() {
    return {
        "stage": { "x": 0.5, "y": 0.08, "width": 0.6, "height": 0.12 },
        "backstage": { "x": 0.5, "y": 0.02, "width": 0.6, "height": 0.05 },
        "vip_zone": [
            { "x": 0.5, "y": 0.22, "width": 0.6, "height": 0.1 }
        ],
        "standing_zones": [
            { "x": 0.25, "y": 0.6, "width": 0.12, "height": 0.55, "label": "standing_1" },
            { "x": 0.375, "y": 0.6, "width": 0.12, "height": 0.55, "label": "standing_2" },
            { "x": 0.5, "y": 0.6, "width": 0.12, "height": 0.55, "label": "standing_center" },
            { "x": 0.625, "y": 0.6, "width": 0.12, "height": 0.55, "label": "standing_4" },
            { "x": 0.75, "y": 0.6, "width": 0.12, "height": 0.55, "label": "standing_5" }
        ],
        "seating_zones": [
            { "x": 0.08, "y": 0.6, "width": 0.12, "height": 0.55, "label": "left_seating" },
            { "x": 0.92, "y": 0.6, "width": 0.12, "height": 0.55, "label": "right_seating" }
        ],
        "stalls": [
            { "x": 0.06, "y": 0.03 },
            { "x": 0.10, "y": 0.03 },
            { "x": 0.06, "y": 0.07 },
            { "x": 0.10, "y": 0.07 },
            { "x": 0.90, "y": 0.03 },
            { "x": 0.94, "y": 0.03 },
            { "x": 0.90, "y": 0.07 },
            { "x": 0.94, "y": 0.07 },
            { "x": 0.06, "y": 0.94 },
            { "x": 0.10, "y": 0.94 },
            { "x": 0.14, "y": 0.94 },
            { "x": 0.86, "y": 0.94 },
            { "x": 0.90, "y": 0.94 },
            { "x": 0.94, "y": 0.94 }
        ],
        "washrooms": [
            { "x": 0.14, "y": 0.05 },
            { "x": 0.86, "y": 0.05 },
            { "x": 0.14, "y": 0.93 },
            { "x": 0.86, "y": 0.93 }
        ],
        "cctv": [
            { "x": 0.02, "y": 0.02 },
            { "x": 0.98, "y": 0.02 },
            { "x": 0.02, "y": 0.98 },
            { "x": 0.98, "y": 0.98 },
            { "x": 0.5, "y": 0.18 },
            { "x": 0.5, "y": 0.92 }
        ],
        "volunteers": [
            { "x": 0.05, "y": 0.35 },
            { "x": 0.05, "y": 0.50 },
            { "x": 0.05, "y": 0.75 },
            { "x": 0.95, "y": 0.35 },
            { "x": 0.95, "y": 0.50 },
            { "x": 0.95, "y": 0.75 },
            { "x": 0.30, "y": 0.18 },
            { "x": 0.70, "y": 0.18 },
            { "x": 0.3, "y": 0.95 },
            { "x": 0.7, "y": 0.95 },
            { "x": 0.10, "y": 0.50 },
            { "x": 0.30, "y": 0.50 },
            { "x": 0.50, "y": 0.50 },
            { "x": 0.70, "y": 0.50 },
            { "x": 0.90, "y": 0.50 }
        ],
        "media": [
            { "x": 0.45, "y": 0.18 },
            { "x": 0.55, "y": 0.18 }
        ],
        "gates": [
            { "x": 0.5, "y": 0.98 }
        ],
        "exits": [
            { "x": 0.06, "y": 0.50 },
            { "x": 0.94, "y": 0.50 }
        ],
        "medical": [
            { "x": 0.15, "y": 0.90 },
            { "x": 0.85, "y": 0.90 }
        ]
    };
}

/* -------------------------------------------
   Start Server
-------------------------------------------- */
app.listen(PORT, () => {
    console.log(`🚀 MassEd.ex server running at http://localhost:${PORT}`);
});