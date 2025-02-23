import React, { useState } from "react";

const Reservations = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation({
      name,
      date,
      time,
      guests,
    });

    // Clear the form after submission
    setName("");
    setDate("");
    setTime("");
    setGuests(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📅 Book a Table
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Reserve Now
          </button>
        </form>

        {/* ✅ Success Message */}
        {confirmation && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <h3 className="text-lg font-semibold">✅ Reservation Confirmed!</h3>
            <p><strong>Name:</strong> {confirmation.name}</p>
            <p><strong>Date:</strong> {confirmation.date}</p>
            <p><strong>Time:</strong> {confirmation.time}</p>
            <p><strong>Guests:</strong> {confirmation.guests}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
