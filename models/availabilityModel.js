const { v4: uuidv4 } = require('uuid'); // Import the UUID v4 module
const db = require('../config/firebaseConfig');

class Availability {
  static async createOrUpdateAvailability(id, instructorId, startTime, endTime, status = 'available') {
    if (!id) {
      id = uuidv4(); // Generate a new ID if not provided
    }
    const availabilityRef = db.collection('availability').doc(id);
    await availabilityRef.set({ id , instructorId, startTime, endTime, status }, { merge: true });
    return id; // Return the actual document ID used
  }

  static async getAvailabilityByInstructor(instructorId) {
    const snapshot = await db.collection('availability')
      .where('instructorId', '==', instructorId)
      .where('status', '==', 'available')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async updateAvailabilityStatus(id, status) {
    await db.collection('availability').doc(id).update({ status });
  }
}

module.exports = Availability;
