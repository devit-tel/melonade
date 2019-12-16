#  melonade

Docker compose version of Melonade
Melonade is workflow orchestration implemented saga pettern

## Document
  - [gitbook](https://app.gitbook.com/@tosbodesz/s/melonade/)

## Start servers in local
    git clone https://github.com/devit-tel/melonade.git
    cd melonade
    docker-compose up

## Start example workers
    node ./examples/simple/worker.js

## Start transaction
    node ./examples/simple/admin.js

## PORT
  - [Process manager api :8081](http://localhost:8081)
  - [Event logger api :8082](http://localhost:8083)
  - [Web monitor :8083](http://localhost:8083)
  - [Elasticsearch :9200](http://localhost:9200)
  - Redis :16379
  - Zookepper :2181
  - Kafka :29092
