/**
 * hackathon-dev - Mock Data Traffic Generator
 * Simulates high-throughput automated requests to verify backend routing loops and security gates
 */

const http = require('http');

const TARGET_URL = 'http://localhost:3000/api/gateway';
const SECURITY_TOKEN = 'compass_secret_secure_key_2026';
const SIMULATION_INTERVAL_MS = 2000; // Sends a data payload every 2 seconds

// Array of mock data payloads to rotate through during simulation loops
const mockPayloads = [
    { system_command: "verify_pipeline", status: "active", engine_load: "12%" },
    { system_command: "sync_metrics", updates: 42, active_workers: 1 },
    { system_command: "flush_buffers", blocks_cleared: 128, optimized: true },
    { system_command: "heartbeat_ping", gateway_node: "node_alpha_01" }
];

let requestCounter = 0;

const sendTrafficPayload = () => {
    requestCounter++;
    
    // Pick a payload from the rotation matrix
    const randomPayload = mockPayloads[Math.floor(Math.random() * mockPayloads.length)];
    const dataString = JSON.stringify({
        ...randomPayload,
        sequence_id: requestCounter,
        timestamp: new Date().toISOString()
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SECURITY_TOKEN}`,
            'Content-Length': Buffer.byteLength(dataString)
        }
    };

    console.log(`[TRAFFIC GEN] Sending packet #${requestCounter}...`);

    const req = http.request(TARGET_URL, options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            console.log(`[TRAFFIC GEN] Response Status: ${res.statusCode} | Data: ${body}`);
        });
    });

    req.on('error', (err) => {
        console.error(`[TRAFFIC GEN] Connection failed. Is server.js running? Error: ${err.message}`);
    });

    req.write(dataString);
    req.end();
};

// Start the continuous automated traffic cycle
console.log(`[TRAFFIC GEN] Initializing automated matrix test loops on a ${SIMULATION_INTERVAL_MS}ms interval.`);
setInterval(sendTrafficPayload, SIMULATION_INTERVAL_MS);
