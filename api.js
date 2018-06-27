const restify = require('restify');
const APIServer = require('./src/structures/APIServer');
const server = new APIServer(restify);

const port = process.env.PORT || 8080;
server.listen(port, `Listening on port ${port}`);

process.on('unhandledRejection', console.log);
