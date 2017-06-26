const microserviceKit = require('../clients/MicroServiceKit');
module.exports = (req, res) => {
    microserviceKit.amqpKit.getQueue('search')
        .sendEvent('search', {keyword: req.query.keyword, debug: req.query.debug}, {persistent: true})
        .then((result) => {
            if (req.query.debug == "true") {
                res.json(result);
            }
            const response = result.hits.hits.map(item => item._source);
            res.json(response);
        });
};