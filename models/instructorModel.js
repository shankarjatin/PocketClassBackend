const db = require('../config/firebaseConfig');

class Instructor {
  static async getInstructors(filters = {}) {
    let query = db.collection('instructors');
    if (filters.skill) query = query.where('skills', 'array-contains', filters.skill);
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = Instructor;
