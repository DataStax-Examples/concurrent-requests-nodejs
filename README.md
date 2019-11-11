# Concurrent Requests in Node.js
This example shows how execute multiple concurrent requests using the Node.js DataStax Driver for Apache Cassandra

Contributor(s): [Jorge Bay Gondra](https://github.com/jorgebay)

## Objectives
- How to limit async concurrent requests using the Node.js DataStax Driver for Apache Cassandra

## Project Layout
- [execute-concurrent-builtin-way.js](concurrent/execute-concurrent-builtin-way.js): Inserts multiple rows in a table from an Array using the driver's built-in method `executeConcurrent()`
- [execute-concurrent-promise-way.js](concurrent/execute-concurrent-promise-way.js): Inserts multiple rows in a table from an Array using Promises

## How this works
The Node.js programs write rows to the database asynchronously while limiting the amount of concurrent requests in flight.

## Setup & Running
### Setup
Make sure Cassandra Node.js Driver is installed
```
npm install cassandra-driver
```

### Running
* execute-concurrent-builtin-way.js 
```
node execute-concurrent-builtin-way.js <database-ip> <datacenter-name> <concurrency-level>
```

* execute-concurrent-promise-way.js
```
node execute-concurrent-promise-way.js <database-ip> <datacenter-name> <concurrency-level>
```

