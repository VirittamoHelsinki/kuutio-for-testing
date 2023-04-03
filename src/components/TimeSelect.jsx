import React from "react";

const TimeSelect = ({ setTime, startTime }) => {
  const start_split = startTime.split(":");
  const start = parseInt(start_split[0]) || 0;
  let values = [];
  for (let i = start; i < 18; i++) {
    if (i < 10) {
      values.push("0" + i + ":00");
      values.push("0" + i + ":30");
    } else {
      values.push(i + ":00");
      values.push(i + ":30");
    }
  }
  return (
    <select className="time-select" onChange={(e) => setTime(e.target.value)}>
      {values.map((value, index) => (
        <option value={value} key={index}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default TimeSelect;
