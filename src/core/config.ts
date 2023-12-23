export const config = {
    isDevelopment: process.env.NODE_ENV === 'development',
    debugLogging: (process.env.DEBUG_LOG || '') === 'true',
    serverHostname: process.env.SERVER_HOSTNAME || 'http://localhost',
    serverIP: process.env.SERVER_IP || '127.0.0.1',
    serverPort: Number(process.env.SERVER_PORT || '3000')
};
