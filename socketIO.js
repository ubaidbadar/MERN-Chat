let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true
            }
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            const error = new Error('Socket connection failed');
            error.statusCode = 502;
            throw error;
        }
        return io;
    }
}