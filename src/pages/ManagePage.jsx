import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { UserAuth } from "../context/AuthContext";
import "../styles/ManagePage.scss";

const weekDays = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];

const init = {
  year: '',
  month: '0',
  day: '',
  weekday: '',
  time: '',
  topic: ''
}

const ManagePage = () => {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(init)
  const [showSelected, setShowSelected] = useState(false);
  const [showConfirmWindow, setShowConfirmWindow] = useState(false);
  const [showReturnWindow, setShowReturnWindow] = useState(false);

  const { user } = UserAuth();

  const fetchBookings = async () => {
    try {
      const documents = [];
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "bookings"));
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setBookings(documents);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async () => {
    try {
      /* delete booking from the users folder */
      await deleteDoc(doc(db, "users", user.uid, "bookings", selected.id));

      /* get bookings from specific day, find the right index, change the data to null and send it back to db */
      const docSnap = await getDoc(doc(db, "bookings", selected.year, selected.month, selected.day));
      const documents = [];
      let i = 0;
      while (docSnap.data()[i]) {
        documents.push(docSnap.data()[i]);
        i++;
      }
      const index = documents.findIndex((booking) => booking.time === selected.time);
      documents[index].data = null;
      await setDoc(doc(db, "bookings", selected.year, selected.month, selected.day), {
        ...documents,
      });
      setBookings(bookings.filter((booking) => booking.id !== selected.id))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="managepage-main">
      <div className="managepage-content">
        <div className="upcoming-content">
          <div className="upcoming-title">
            <label>Ajanvarauksesi</label>
          </div>
          <div className="upcoming-bookings">
            {bookings.map((booking, index) => (
              <div
                className="booking-content"
                key={index}
                onClick={() => {
                  setSelected(booking);
                  setShowSelected(true);
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
                  <div className="topic-label">
                    <label>{booking.topic}</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="selected-main">
        {showSelected && (
          <div className="selected-content">
            <div className="selected-details">
              <div className="selected-title">
                <label>Olet varannut:</label>
              </div>
              <div className="text-row">
                <div className="text-subject">
                  <label>Päivä:</label>
                </div>
                <div className="text-value">
                  <label>
                    {selected.day}/{parseInt(selected.month) + 1}/{selected.year}
                  </label>
                </div>
              </div>
              <div className="text-row">
                <div className="text-subject">
                  <label>Aihe:</label>
                </div>
                <div className="text-value">
                  <label>{selected.topic}</label>
                </div>
              </div>
              <div className="text-row">
                <div className="text-subject">
                  <label>Aika:</label>
                </div>
                <div className="text-value">
                  <label>{selected.time}</label>
                </div>
              </div>
            </div>
            <div className="remove-button-content">
              <button 
                className="remove-button" 
                onClick={() => setShowConfirmWindow(true)}
              >
                Poista varaus
              </button>
            </div>
          </div>       
        )}
        </div>
      </div>
      {showConfirmWindow && (
        <div className="fullscreen-modal">
          <div className="modal-detail-content">
            <label>Haluatko varmasti poistaa varauksen?</label>
          </div>
          <div className="modal-buttons">
            <button
              className="black-button"
              onClick={() => {
                deleteBooking();
                setShowSelected(false)
                setShowConfirmWindow(false);
                setShowReturnWindow(true);
              }}
            >
              Kyllä
            </button>
            <button className="nocolor-button" onClick={() => setShowConfirmWindow(false)}>
              Peruuta
            </button>
          </div>
        </div>
      )}
      {showReturnWindow && (
        <div className="fullscreen-modal">
          <div className="modal-detail-content">
            <label>Ajanvaraus poistettu!</label>
          </div>
          <div className="modal-buttons">
            <button className="black-button" onClick={() => setShowReturnWindow(false)}>
              Jatka hallinnointia
            </button>
            <Link to="/">
              <button className="nocolor-button" onClick={() => setShowReturnWindow(false)}>
                Takaisin etusivulle
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePage;
