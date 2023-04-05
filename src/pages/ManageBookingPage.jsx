import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { UserAuth } from "../context/AuthContext";
import "../styles/ManageBookingPage.scss";

const weekDays = [Sunnuntai, Maanantai, Tiistai, Keskiviikko, Torstai, Perjantai, Lauantai];

const ManageBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [showSelectedModal, setShowSelectedModal] = useState(false);

  const { user } = UserAuth();

  const fetchBookings = async () => {
    try {
      const documents = [];
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "bookings"));
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      setBookings(documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="managebooking-main">
      <div className="managebooking-content">
        <div className="upcoming-content">
          <div className="upcoming-title">
            <label>Tulevat ajanvaraukset</label>
          </div>
          <div className="upcoming-bookings">
            {bookings.map((booking, index) => (
              <div
                className="booking-content"
                key={index}
                onClick={() => {
                  if (!showSelectedModal) {
                    setShowSelectedModal(true);
                  }
                }}
              >
                <div className="date-title-content">
                  <label>{weekDays[booking.weekday]}</label>
                  <label>
                    {booking.day}/{parseInt(booking.month) + 1}/{booking.year}
                  </label>
                </div>
                <div className="time-topic-content">
                  <div className="time-box">{booking.time}</div>
                  <div className="topic-email">
                    <div className="topic-label">
                      <label>{booking.topic}</label>
                    </div>
                    <div className="email-label">
                      <label>{booking.email}</label>
                    </div>
                  </div>
                </div>
                {showSelectedModal && (
                  <div className="selected-modal">
                    <div className="selected-main">
                      <div className="selected-content">
                        <div className="selected-title">
                          <label>Olet varannut:</label>
                        </div>
                        <div className="text-row">
                          <div className="text-subject">
                            <label>Päivä:</label>
                          </div>
                          <div className="text-value">
                            <label>
                              {booking.day}/{parseInt(booking.month) + 1}/{booking.year}
                            </label>
                          </div>
                        </div>
                        <div className="text-row">
                          <div className="text-subject">
                            <label>Aihe:</label>
                          </div>
                          <div className="text-value">
                            <label>{booking.topic}</label>
                          </div>
                        </div>
                        <div className="text-row">
                          <div className="text-subject">
                            <label>Aika:</label>
                          </div>
                          <div className="text-value">
                            <label>{booking.time}</label>
                          </div>
                        </div>
                      </div>
                      <div className="remove-button-content">
                        <button className="remove-button">Poista varaus</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookingPage;
