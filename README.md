# Process indexer

A process that keeps a database updated with transactions injected into the C-Chain. Retrieves transactions in streaming, i.e., from the moment the indexing process is first started.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app within a container

```bash
# create image
$ docker build -t process-indexer .

# run container
$ docker run -e DB_CONN_URI=<your-mongo-instance-uri> --name process-indexer process-indexer

```
## Running the app as cluster

```bash
# create process-indexer and connect to mongo instance
$ docker compose up
```
