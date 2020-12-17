let io;

module.exports = {
    init: httpServer => require('socket.io')(httpServer),
    getIO: () => {
        if(!io){
            const error = new Error();
            error.statusCode = 502;
            error.message = 'Socket connection failed'
        }
        return io;
    }
}