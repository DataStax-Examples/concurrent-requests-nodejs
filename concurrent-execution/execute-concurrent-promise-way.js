"use strict";
const cassandra = require('cassandra-driver');
const Uuid = cassandra.types.Uuid;



/**
 * Inserts multiple rows in a table limiting the amount of parallel requests.
 *
 * Note that here is a built-in method in the driver <code>executeConcurrent()</code> that allows you to execute
 * multiple simultaneous requests using an Array or a Stream. Check out execute-concurrent-array.js for more
 * information.
 *
 * You can also use existing libraries to limit concurrency in a loop, for example:
 *  - https://caolan.github.io/async/docs.html#eachLimit
 *  - http://bluebirdjs.com/docs/api/promise.map.html
 */
async function example() {
  const args = process.argv;
  if(args.length < 5){
    console.log('Usage: node execute-concurrent-promise-way.js contactPoint_IP dataCenter desired_concurrency_level');
    return;
  }
  const client = new cassandra.Client({ contactPoints: [args[2]], localDataCenter: args[3] });
  await client.connect();
  await client.execute(`CREATE KEYSPACE IF NOT EXISTS examples
                        WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`);
  await client.execute(`USE examples`);
  await client.execute(`CREATE TABLE IF NOT EXISTS tbl_sample_kv (id uuid, value text, PRIMARY KEY (id))`);

  // The maximum amount of async executions that are going to be launched in parallel
  // at any given time
  const concurrencyLevel = args[4];
  const promises = new Array(concurrencyLevel);

  const info = {
    totalLength: 10000,
    counter: 0
  };

  // Launch in parallel n async operations (n being the concurrency level)
  for (let i = 0; i < concurrencyLevel; i++) {
    promises[i] = executeOneAtATime(client,info);
  }

  try {
    // The n promises are going to be resolved when all the executions are completed.
    await Promise.all(promises);

    console.log(`Finished executing ${info.totalLength} queries with a concurrency level of ${concurrencyLevel}.`);

  } finally {
    client.shutdown();
  }
}

async function executeOneAtATime(client,info) {
  const query = 'INSERT INTO tbl_sample_kv (id, value) VALUES (?, ?)';
  const options = { prepare: true, isIdempotent: true };

  while (info.counter++ < info.totalLength) {
    const params = [ Uuid.random(), `Value for ${info.counter}`];
    await client.execute(query, params, options);
  }
}

example();