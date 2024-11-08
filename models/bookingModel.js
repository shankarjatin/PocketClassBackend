const db = require('../config/firebaseConfig');

class Booking {
  static async createBooking(studentId, instructorId, startTime, endTime) {
    const bookingRef = db.collection('bookings').doc();
    await bookingRef.set({ studentId, instructorId, startTime, endTime, status: 'confirmed' });

    // Update the corresponding availability slot to booked
    const availabilitySnapshot = await db.collection('availability')
      .where('instructorId', '==', instructorId)
      .where('startTime', '==', startTime)
      .where('status', '==', 'available')
      .get();

    if (!availabilitySnapshot.empty) {
      const availabilityDoc = availabilitySnapshot.docs[0];
      await availabilityDoc.ref.update({ status: 'booked' });
    }

    return bookingRef.id;
  }

  static async getConfirmedBookings(instructorId) {
    const snapshot = await db.collection('bookings')
      .where('instructorId', '==', instructorId)
      .where('status', '==', 'confirmed')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = Booking;
