const db = require("./dbConfig");


module.exports = {
    find,
    findBy,
    add,
    update,
    remove
}

//resolves to an array of schemes
function find() {
    return db("users");
}

//resolves to a single scheme or null if the id is invalid
function findBy(filter) {
    return db("users").select("username", "password").where(filter).first();
  }

function add(user) {
   return db("users").insert(user);
}

function update(changes, id) {
    return db("users").where({ id }).update(changes);
}
  
function remove(id) {
    return db("users").where({ id }).delete();
}
