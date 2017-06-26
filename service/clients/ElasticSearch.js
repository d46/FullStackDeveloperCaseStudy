var elasticsearch = require('elasticsearch');

class ElasticSearchClient {

    init(host = "localhost:9200", indexName = "roo") {
        // Defaults
        this.indexName = indexName;
        this.client = new elasticsearch.Client({
            host: host,
            log: 'info'
        });
        return this.client.ping();
    }

    // Check index exist
    indexExist() {
        return this.client.indices.exists({
            index: this.indexName
        })
    }

    // Delete index
    deleteIndex() {
        return this.client.indices.delete({
            index: this.indexName
        });
    }

    // Build mapping
    initMapping() {
        return this.client.indices.create({
            index: this.indexName,
            body: {
                mappings: {
                    product: {
                        properties: {
                            sku: {
                                type: 'text'
                            },
                            ediRef: {
                                type: 'text'
                            },
                            name: {
                                type: 'text',
                                analyzer: 'simple'
                            },
                            description: {
                                type: 'text',
                                analyzer: 'simple',
                            },
                            isInStock: {
                                type: 'boolean',
                            }
                        }
                    }
                }
            }
        })
    }

    // Add product
    addProduct(product) {
        return this.client.index({
            index: this.indexName,
            type: 'product',
            body: product
        })
    }

    getProducts(keyword) {
        return this.client.search({
            index: this.indexName,
            body: {
                size: 5,
                // sort: {
                //     'isInStock': {
                //         order: 'desc'
                //     }
                // },
                query: {
                    bool: {
                        should: [
                            {
                                multi_match: {
                                    query: keyword,
                                    type: "phrase",
                                    fields: ["sku", "ediRef"]
                                }
                            },
                            {
                                function_score: {
                                    query: {
                                        bool: {
                                            must: [
                                                {
                                                    multi_match: {
                                                        fields: ["name", "description"],
                                                        query: keyword,
                                                        fuzziness: 2
                                                    }
                                                }
                                            ],
                                            filter: [
                                                {
                                                    bool: {
                                                        should: {
                                                            match: {
                                                                isInStock: false
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    script_score: {
                                        script: "Math.log(_score+2)"
                                    }
                                }
                            },
                            {
                                function_score: {
                                    query: {
                                        bool: {
                                            must: [
                                                {
                                                    multi_match: {
                                                        fields: ["name", "description"],
                                                        query: keyword,
                                                        fuzziness: 2
                                                    }
                                                }
                                            ],
                                            filter: [
                                                {
                                                    bool: {
                                                        should: {
                                                            match: {
                                                                isInStock: true
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    script_score: {
                                        script: "Math.log(_score+5)"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        })
    }
}

module.exports = new ElasticSearchClient();
