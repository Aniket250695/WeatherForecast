import React, { useState } from "react";

function ShowDateTime() {
  var time = new Date().toLocaleTimeString();
  var [stime, settime] = useState(time);

  var date = new Date().toLocaleDateString();
  var [sdate, setDate] = useState(date);

  var updateTime = () => {
    time = new Date().toLocaleTimeString();
    settime(time);
  };

  var updateDate = () => {
    date = new Date().toLocaleDateString();
    setDate(date);
  };

  setInterval(updateTime, 1000);
  setInterval(updateDate, 360000);

  return (
    <div>
      {sdate}, {stime}
    </div>
  );
}
export default ShowDateTime;
