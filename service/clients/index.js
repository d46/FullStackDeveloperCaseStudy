const elasticSearch = require('./ElasticSearch');
const microserviceKit = require('./MicroServiceKit');

class Clients {

    run() {
        // Promise always return promise. Those were the last promises of the all Promises
        return Promise.all([this.mskInit(), this.esInit()]);
    }

    mskInit() {
        return microserviceKit.init().then(() => {
            microserviceKit.amqpKit.getQueue('search')
                .consumeEvent('search', (data, done) => {
                    if (data.keyword) {
                        elasticSearch.getProducts(data.keyword)
                            .then((result) => {
                                done(null, result)
                            })
                    }
                });
        })
    }

    esInit() {
        return elasticSearch.init().then(() => {
            return elasticSearch.indexExist().then((exists) => {
                if (exists) {
                    return elasticSearch.deleteIndex();
                }
            }).then(() => {
                return elasticSearch.initMapping().then(() => {
                    let products = require('./products.json');
                    let pQue = products.map((product) => {
                        return elasticSearch.addProduct(product)
                    });
                    return Promise.all(pQue);
                })
            })
        })

    }
}

module.exports = new Clients();