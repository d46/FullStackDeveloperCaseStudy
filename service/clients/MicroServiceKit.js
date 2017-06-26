const MicroserviceKit = require('microservice-kit');

module.exports = new MicroserviceKit({
    type: 'client',
    amqp: {
        url: 'amqp://localhost:5672',
        queues: [
            {
                name: 'Search',
                key: 'search',
                options: {
                    durable: true
                }
            }
        ]
    }
});
