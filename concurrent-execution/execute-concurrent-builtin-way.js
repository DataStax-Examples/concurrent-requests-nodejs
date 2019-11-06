"use strict";
const cassandra = require('cassandra-driver');
const executeConcurrent = cassandra.concurrent.executeConcurrent;
const Uuid = cassandra.types.Uuid;



/**
 * Inserts multiple rows in a table from an Array using the built in method <code>executeConcurrent()</code>,
 * limiting the amount of parallel requests.
 */
async function example() {
  const args = process.argv;
  if(args.length < 5){
      console.log('Usage: node execute-concurrent-builtin-way.js contactPoint_IP dataCenter desired_concurrency_level');
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

  // Use an Array with 10000 different values
  const values = Array.from(new Array(10000).keys()).map(x => [ Uuid.random(), x.toString() ]);

  try {

    const query = 'INSERT INTO tbl_sample_kv (id, value) VALUES (?, ?)';
    await executeConcurrent(client, query, values, { concurrencyLevel: concurrencyLevel });

    console.log(`Finished executing ${values.length} queries with a concurrency level of ${concurrencyLevel}.`);

  } finally {
    client.shutdown();
  }
}

example();