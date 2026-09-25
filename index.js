/**
 * Compass OS - Core Interface Panel Controller
 * System: Andrews Control
 */

document.addEventListener('DOMContentLoaded', () => {
    // Core UI Element Selectors
    const consoleLog = document.querySelector('.console-log');
    const sysIndicator = document.querySelector('.indicator');
    const sysStatusText = document.querySelector('.indicator-group span');

    /**
     * Appends formatted timestamps and strings directly into the terminal UI element
     * @param {string} message - The system log message to display
     */
    function appendTerminalLog(message) {
        if (!consoleLog) return;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // Build the new log string entry
        const logEntry = `<div>&gt; [${timestamp}] ${message}</div>`;
        
        // Inject and maintain auto-scroll down to latest event entry
        consoleLog.insertAdjacentHTML('beforeend', logEntry);
        consoleLog.scrollTop = consoleLog.scrollHeight;
    }

    /**
     * Dynamic UI Status Controller
     * @param {string} state - 'online', 'offline', or 'alert'
     */
    function updateSystemStatus(state) {
        if (!sysIndicator || !sysStatusText) return;

        switch (state.toLowerCase()) {
            case 'online':
                sysIndicator.style.backgroundColor = 'var(--status-green)';
                sysIndicator.style.boxShadow = '0 0 8px var(--status-green)';
                sysStatusText.textContent = 'Online';
                appendTerminalLog('Operational baseline secure.');
                break;
            case 'offline':
                sysIndicator.style.backgroundColor = '#6e7681';
                sysIndicator.style.boxShadow = 'none';
                sysStatusText.textContent = 'Disconnected';
                appendTerminalLog('Warning: Link connection dropped.');
                break;
            case 'alert':
                sysIndicator.style.backgroundColor = 'var(--alert-red)';
                sysIndicator.style.boxShadow = '0 0 8px var(--alert-red)';
                sysStatusText.textContent = 'Alert';
                appendTerminalLog('Critical: Diagnostic parameters out of bounds.');
                break;
        }
    }

    // Initialize System Automation Loops
    setTimeout(() => {
        appendTerminalLog('Mapping environment loops...');
        updateSystemStatus('online');
    }, 1200);
});
