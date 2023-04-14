import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { UserAuth } from "../context/AuthContext";
import Calendar from "../components/Calendar";
import "../styles/BookingPage.scss";

const initTimes = () => {
  let times = [{ time: "07:30", data: null }];
  for (let i = 8; i < 18; i++) {
    if (i < 10) {
      times.push({ time: "0" + i + ":00", data: null });
      times.push({ time: "0" + i + ":30", data: null });
    } else {
      times.push({ time: i + ":00", data: null });
      times.push({ time: i + ":30", data: null });
    }
  }
  return times;
};

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newBooking, setNewBooking] = useState(false);
  const [topic, setTopic] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookings, setBookings] = useState(initTimes());
  const [showConfirmWindow, setShowConfirmWindow] = useState(false);
  const [showThanksWindow, setShowThanksWindow] = useState(false);

  const { user } = UserAuth();

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  const createBooking = async () => {
    const bookings_copy = [...bookings];
    const index = bookings_copy.findIndex((booking) => booking.time === selectedTime);
    bookings_copy[index].data = { topic: topic, email: user.email, uid: user.uid };
    try {
      const year = selectedDate.getFullYear().toString();
      const month = selectedDate.getMonth().toString();
      const day = selectedDate.getDate().toString();
      await setDoc(doc(db, "bookings", year, month, day), {
        ...bookings_copy,
      });
      const dataRef = doc(collection(db, "users", user.uid, "bookings"));
      await setDoc(dataRef, {
        year: year,
        month: month,
        day: day,
        time: selectedTime,
        weekday: selectedDate.getDay().toString(),
        topic: topic,
      });
      setBookings(bookings_copy);
      setTopic("");
      setNewBooking(false);
    } catch (error) {
      window.alert("Ongelmia tietokantaan tallentamisessa:\n\n" + error);
    }
  };

  const fetchBookings = async () => {
    try {
      const docSnap = await getDoc(
        doc(db, "bookings", selectedDate.getFullYear().toString(), selectedDate.getMonth().toString(), selectedDate.getDate().toString())
      );
      if (docSnap.exists()) {
        const documents = [];
        let i = 0;
        while (docSnap.data()[i]) {
          documents.push(docSnap.data()[i]);
          i++;
        }
        setBookings(documents);
      } else {
        setBookings(initTimes());
      }
    } catch (error) {
      window.alert("Ongelmia tietokannasta hakemisessa:\n\n" + error);
    }
  };

  useEffect(() => {
    setBookings(initTimes());
    setNewBooking(false);
    setTopic("");
    if (selectedDate) {
      fetchBookings();
    }
  }, [selectedDate]);

  return (
    <div className="bookingpage-main">
      <div className="bookingpage-content">
        <div className="calendar-times-content">
          <Calendar date={date} setDate={setDate} setSelectedDate={setSelectedDate} />
          {selectedDate && (
            <div className="times-content">
              <div className="times-headline">
                <label>Ajat</label>
              </div>
              <div className="times-row">
                {bookings.map((booking, index) => {
                  const disabled = booking.data === null ? false : true;
                  return (
                    <div
                      className={`time-box ${disabled ? " disabled" : ""}`}
                      key={index}
                      onClick={() => {
                        if (!disabled) {
                          setSelectedTime(booking.time);
                          setNewBooking(true);
                        }
                      }}
                    >
                      {booking.time}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="booking-content">
          <div className="booking-data-content">
            {selectedDate && (
              <div className="booking-data">
                <div className="booking-headline">
                  <label>{date.toLocaleDateString("fi-FI", options)}</label>
                </div>
                {newBooking ? (
                  <div className="new-booking-content">
                    <div className="topic-content">
                      <input placeholder="aihe" value={topic} onChange={(e) => setTopic(e.target.value)} />
                    </div>
                    <div className="selected-time">
                      <label>Olet varaamassa klo</label>
                      <label>{selectedTime}</label>
                    </div>
                  </div>
                ) : (
                  <div className="booking-column">
                    {bookings
                      .filter((b) => b.data !== null)
                      .map((booking, index) => (
                        <div className="booking-details" key={index}>
                          <div className="time-label">
                            <label>{booking.time}</label>
                          </div>
                          <div className="detail-content">
                            <div className="name-label">
                              <label>{booking.data.email}</label>
                            </div>
                            <div className="topic-label">
                              <label>{booking.data.topic}</label>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="booking-button-content">
            {topic !== "" ? (
              <button className="booking-button" onClick={() => setShowConfirmWindow(true)}>
                Varaa
              </button>
            ) : (
              <button className="booking-button disabled">Varaa</button>
            )}
            <Link to="/" className="homepage-button">
              Palaa etusivulle
            </Link>
          </div>
        </div>
      </div>
      {showConfirmWindow && (
        <div className="fullscreen-modal">
          <div className="modal-detail-content">
            <div className="detail-row">
              <div className="detail-subject">
                <label>Aihe:</label>
              </div>
              <div className="detail-value">
                <label>{topic}</label>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-subject">
                <label>Päivä:</label>
              </div>
              <div className="detail-value">
                <label>{selectedDate.toLocaleDateString("fi-FI")}</label>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-subject">
                <label>Aika:</label>
              </div>
              <div className="detail-value">
                <label>{selectedTime}</label>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-subject">
                <label>Nimi:</label>
              </div>
              <div className="detail-value">
                <label>{user.email}</label>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button
              className="black-button"
              onClick={() => {
                createBooking();
                setShowConfirmWindow(false);
                setShowThanksWindow(true);
              }}
            >
              Vahvista
            </button>
            <button className="nocolor-button" onClick={() => setShowConfirmWindow(false)}>
              Peruuta
            </button>
          </div>
        </div>
      )}
      {showThanksWindow && (
        <div className="fullscreen-modal">
          <div className="modal-thanks-content">
            <div className="thanks-label">
              <label>Kiitos!</label>
            </div>
            <div className="description-label">
              <label>Huone on varattu sinulle!</label>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="black-button" onClick={() => setShowThanksWindow(false)}>
              Tee uusi varaus
            </button>
            <Link to="/">
              <button className="nocolor-button" onClick={() => setShowThanksWindow(false)}>
                Takaisin etusivulle
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
