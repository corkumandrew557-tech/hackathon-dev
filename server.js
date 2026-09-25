/**
 * hackathon-dev - Core Software Gateway
 * Lightweight, zero-dependency backend router and automation engine
 */

const http = require('http');
const PORT = process.env.PORT || 3000;

// Central system state metrics tracker
const systemState = {
    status: "ONLINE",
    uptime: 0,
    processedRequests: 0,
    activeLoops: 1
};

// Route Mapping Matrix
const routes = {
    // Core system health check endpoint
    '/api/status': (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: "SUCCESS",
            message: "System Routing Matrix Active",
            metrics: {
                ...systemState,
                uptime: Math.floor(process.uptime()) + "s"
            }
        }));
    },
    
    // Core gateway traffic webhook handler
    '/api/gateway': (req, res) => {
        if (req.method !== 'POST') {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Method not allowed. Use POST." }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                systemState.processedRequests++;
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: "PROCESSED",
                    timestamp: new Date().toISOString(),
                    receivedData: payload
                }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid JSON payload structure." }));
            }
        });
    }
};

// Start the core structural server loop
const server = http.createServer((req, res) => {
    // Basic CORS and system response headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // Direct routing match execution
    if (routes[req.url]) {
        routes[req.url](req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint route not found in core matrix." }));
    }
});

server.listen(PORT, () => {
    console.log(`[System Gateway] Engine operational on port ${PORT}`);
});
