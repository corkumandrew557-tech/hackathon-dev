/**
 * hackathon-dev - Core Software Gateway
 * Lightweight, zero-dependency backend router with token authentication and logging
 */

const http = require('http');
const logger = require('./logger'); // Linked logging utility
const PORT = process.env.PORT || 3000;

// Central system state metrics tracker
const systemState = {
    status: "ONLINE",
    uptime: 0,
    processedRequests: 0,
    failedAuthAttempts: 0,
    activeLoops: 1
};

// Define a static secure token for local verification logic
const SECURITY_TOKEN = "compass_secret_secure_key_2026";

// Route Mapping Matrix
const routes = {
    // Core system health check endpoint
    '/api/status': (req, res) => {
        logger.info("Health check endpoint accessed.");
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
    
    // Core gateway traffic webhook handler with authentication protection
    '/api/gateway': (req, res) => {
        const clientIp = req.socket.remoteAddress || 'unknown';

        if (req.method !== 'POST') {
            logger.error(`Invalid method ${req.method} attempted on /api/gateway`);
            res.writeHead(405, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Method not allowed. Use POST." }));
        }

        // Token Extraction check from Authorization headers
        const authHeader = req.headers['authorization'];
        if (!authHeader || authHeader !== `Bearer ${SECURITY_TOKEN}`) {
            systemState.failedAuthAttempts++;
            logger.authFailure('/api/gateway', clientIp, "Missing or invalid security token.");
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Access Denied: Invalid or missing security token." }));
        }

        logger.authSuccess('/api/gateway', clientIp);

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                systemState.processedRequests++;
                logger.info("Payload processed successfully through core matrix gateway.");
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: "PROCESSED",
                    authenticated: true,
                    timestamp: new Date().toISOString(),
                    receivedData: payload
                }));
            } catch (err) {
                logger.error("Failed to parse incoming payload structure", err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid JSON payload structure." }));
            }
        });
    },

    // Token verification test check loop route
    '/api/auth-test': (req, res) => {
        const clientIp = req.socket.remoteAddress || 'unknown';
        const authHeader = req.headers['authorization'];
        
        if (authHeader === `Bearer ${SECURITY_TOKEN}`) {
            logger.authSuccess('/api/auth-test', clientIp);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: "VERIFIED", message: "Token block authentication test successful." }));
        } else {
            systemState.failedAuthAttempts++;
            logger.authFailure('/api/auth-test', clientIp, "Test token mismatch.");
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: "FAILED", error: "Token block authentication test failed." }));
        }
    }
};

// Start the core structural server loop
const server = http.createServer((req, res) => {
    // Basic CORS and system response headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // Direct routing match execution
    if (routes[req.url]) {
        routes[req.url](req, res);
    } else {
        logger.error(`Route not found: ${req.url}`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint route not found in core matrix." }));
    }
});

server.listen(PORT, () => {
    logger.info(`Engine operational on port ${PORT}`);
});
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
