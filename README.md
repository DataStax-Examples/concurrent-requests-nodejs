# Node.js Concurrent quries examples
## Introduction

This repository consists of two examples of executing concurrent queries to a Cassandra cluster. Users can learn how to customize the desired level of currency suitable to their applications.

* Pre-requisites
    * knowledge of nodejs
    * knowledge of Promise
    * knowledge of Datastax Cassandra nodejs driver

* Project set up
    * make sure to include "cassandra-driver" in the package.json



## Examples
* execute-concurrent-builtin-way.js 
    * This example showcases the driver builtin capability of executing concurrent quries.
    * Usage: node execute-concurrent-builtin-way.js contactPoint_IP dataCenter desired_concurrency_level 
    

* execute-concurrent-promise-way.js
    * This example demostrates concurrent queries through Promises in nodejs. 
    * Usage: node execute-concurrent-promise-way.js contactPoint_IP dataCenter desired_concurrency_level

