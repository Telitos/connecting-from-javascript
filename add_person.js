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


const input = process.argv.slice(2)



const newPerson = {first_name: input[0], last_name: input[1], birthdate: input[2]}

  knex('famous_people')
    .insert(newPerson)
    .then((result) => {
      console.log(result)
      knex.destroy()
    })