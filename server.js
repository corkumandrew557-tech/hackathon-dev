const http = require('http'); 
// Use the existing PORT variable if defined, otherwise default to 3000 
const PORT = typeof PORT !== 'undefined' ? PORT : (process.env.PORT || 3000); 

// Global safety check: If routes object doesn't exist yet, initialize a fallback 
if (typeof routes === 'undefined') { 
    global.routes = { 
        '/': (req, res) => { 
            res.writeHead(200, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ status: "Gateway Operational", fallback: true })); 
        } 
    }; 
} 

// Initialize HTTP Engine 
const server = http.createServer((req, res) => { 
    try { 
        // Parse the URL safely to extract a clean pathname without query strings 
        const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`); 
        
        // Direct routing match execution using the active routes registry 
        if (routes[pathname]) { 
            routes[pathname](req, res); 
        } else { 
            // 404 Endpoint Not Found Handler 
            res.writeHead(404, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ error: "Endpoint route not found in core matrix." })); 
        } 
    } catch (error) { 
        // Internal Server Error Safety Catch 
        res.writeHead(500, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify({ error: "Internal Gateway Error", details: error.message })); 
    } 
}); 

// Launch Gateway Server 
server.listen(PORT, () => { 
    console.log(`[System Gateway] Engine operational on port ${PORT}`); 
});
