// src/apis/auth/model.js
class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // armazenado como hash
  }
}

module.exports = User;

