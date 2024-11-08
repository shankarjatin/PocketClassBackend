const db = require('../config/firebaseConfig');

class User {
  static async createUser(email, password, role) {
    const userRef = db.collection('users').doc();
    await userRef.set({
      email,
      password,  // Store passwords securely in production (e.g., using bcrypt)
      role
    });
    return userRef.id;
  }

  static async findByEmail(email) {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }
}

module.exports = User;
