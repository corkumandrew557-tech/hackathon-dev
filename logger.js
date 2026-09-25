/**
 * hackathon-dev - Observability Logging Matrix
 * Lightweight logging utility to track system gateway states and authorization metrics
 */

const formatTimestamp = () => {
    return new Date().toISOString();
};

const logger = {
    info: (message, context = '') => {
        console.log(`[${formatTimestamp()}] [INFO] [SYSTEM] ${message} ${context ? '| Context: ' + JSON.stringify(context) : ''}`);
    },
    
    authSuccess: (route, ip) => {
        console.log(`[${formatTimestamp()}] [AUTH] [SUCCESS] Access granted for route: ${route} | Origin: ${ip}`);
    },
    
    authFailure: (route, ip, reason) => {
        console.error(`[${formatTimestamp()}] [AUTH] [BLOCKED] Security Alert: Unauthorized access attempt to ${route} | Origin: ${ip} | Reason: ${reason}`);
    },
    
    error: (message, errorObject) => {
        console.error(`[${formatTimestamp()}] [ERROR] [CRITICAL] ${message} | Details: ${errorObject.message || errorObject}`);
    }
};

module.exports = logger;
