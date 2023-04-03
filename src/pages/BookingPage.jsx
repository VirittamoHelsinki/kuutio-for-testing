import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Calendar from "../components/Calendar";
import "../styles/BookingPage.scss";

let times = [{time: "07:30", data: null}];

for (let i = 8; i < 18; i++) {
  if (i < 10) {
    times.push({time: "0" + i + ":00", data: null});
    times.push({time: "0" + i + ":30", data: null});
  } else {
    times.push({time: i + ":00", data: null});
    times.push({time: i + ":30", data: null});
  }
}

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newBooking, setNewBooking] = useState(false);
  const [topic, setTopic] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookings, setBookings] = useState(times);

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  const onBookingClick = async () => {
    const bookings_copy = [...bookings];
    const index = bookings_copy.findIndex((booking) => booking.time === selectedTime);
    bookings_copy[index].data = {topic: topic, name: "Essi Esimerkki"}
    try {
      await setDoc(doc(db, 'bookings', selectedDate.getFullYear().toString(), selectedDate.getMonth().toString(), selectedDate.getDate().toString()), {
        ...bookings_copy
      });
      setBookings(bookings_copy)
    } catch (error) {
      console.log(error)
    }
  };

  const getBookings = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'bookings', selectedDate.getFullYear().toString(), selectedDate.getMonth().toString(), selectedDate.getDate().toString()));
      if (docSnap.exists()) {
        const documents = []
        let i = 0;
        while (docSnap.data()[i]) {
          documents.push(docSnap.data()[i]);
          i++;
        }
        setBookings(documents)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setNewBooking(false);
    setTopic('');
    if (selectedDate) {
      getBookings();
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
                      className={`time-box ${disabled ? ' disabled' : ''}`}
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
                  )
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
                      <input 
                        placeholder="aihe"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)} 
                      />
                    </div>
                    <div className="selected-time">
                      {selectedTime}
                    </div>
                  </div>
                ): (
                  <div>
                  {bookings.filter((booking) => booking.data !== null).map((b, index) => (
                    <div key={index}>{b.time}</div>
                  ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="booking-button-content">
            {topic !== '' ? 
            (<button 
              className="booking-button" 
              onClick={() => onBookingClick()}
              >Varaa
            </button>) : 
            (<button className="booking-button disabled">Varaa</button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
