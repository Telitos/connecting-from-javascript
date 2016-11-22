"use strict";
const moment = require("moment")
const settings = require("./settings")

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl : true
  }
})

const input = process.argv[2]

const print = (result) => {
  console.log(`Searching ...`)
  const arraySize = result.length
  console.log(`Found ${arraySize} person(s) by the name '${input}':\n`)

  for (let person of result) {
    const birthdate = moment(person.birthdate).format('YYYY-MM-DD')
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${birthdate}`)
  }
  knex.destroy()
}

knex('famous_people')
.where(function() {
  this.where('first_name', input)
  .orWhere('last_name', input)
})
.select()
.then((result) => {
  console.log(result)
print(result)})
.catch((err) => {
  console.log("error running query;", err)
knex.destroy()})
.timeout(10000)