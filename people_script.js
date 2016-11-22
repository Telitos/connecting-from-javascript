"use strict";

const pg = require("pg");
const moment = require("moment")
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  const args = process.argv[2]
  const query = `SELECT * FROM famous_people
    WHERE first_name = $1
    OR last_name = $1`

  client.query(query, [args], function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching ...`)
    const arraySize = result.rows.length
    console.log(`Found ${arraySize} person(s) by the name '${args}':\n`)

    for (let person of result.rows) {
    const birthdate = moment(person.birthdate).format('YYYY-MM-DD')
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${birthdate}`)
    };
    client.end();
  })
});
