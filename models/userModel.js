const db = require('../config/firebaseConfig');
const bcrypt = require('bcryptjs');
const punycode = require('punycode/');  // Ensure there's a reason to use punycode, or consider removing it if it's unused.

class User {
  static async createUser(email, password, role) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRef = db.collection('users').doc();
    await userRef.set({
      email,
      password: hashedPassword, // Store the hashed password
      role
    });
    return userRef.id;
  }

  static async findByEmail(email) {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  static async validatePassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return false;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
  }
}

module.exports = User;
