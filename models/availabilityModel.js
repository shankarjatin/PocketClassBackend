const db = require('../config/firebaseConfig');

class Availability {
  static async createOrUpdateAvailability(id, instructorId, startTime, endTime, status = 'available') {
    const availabilityRef = db.collection('availability').doc(id);
    await availabilityRef.set({ instructorId, startTime, endTime, status }, { merge: true });
    return availabilityRef.id;
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
