import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import TimeSelect from "../components/TimeSelect";
import "../styles/BookingPage.scss";

let times = ["07:30"];

for (let i = 8; i < 18; i++) {
  if (i < 10) {
    times.push("0" + i + ":00");
    times.push("0" + i + ":30");
  } else {
    times.push(i + ":00");
    times.push(i + ":30");
  }
}

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newBooking, setNewBooking] = useState(false);
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

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
                {times.map((time, index) => (
                  <div
                    className="time-box"
                    key={index}
                    onClick={() => {
                      setStartTime(time);
                      setNewBooking(true);
                    }}
                  >
                    {time}
                  </div>
                ))}
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
                {newBooking && (
                  <div className="new-booking-content">
                    <div className="topic-content">
                      <input placeHolder="aihe" />
                    </div>
                    <div className="time-select-content">
                      <TimeSelect setTime={setStartTime} startTime={startTime} />
                      <p>-</p>
                      <TimeSelect setTime={setStartTime} startTime={startTime} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="booking-button-content">
            <button className="booking-button">Varaa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
