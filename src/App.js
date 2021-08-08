import React, { useState } from "react";
import DateTime from "./DateTimeShow";
import "./App.css";
import "./bootstrap.css";

function App() {
  const [bgImage, setBgImage] = useState("");
  const [Loc, setLoc] = useState();
  const [Loc1, setLoc1] = useState(Loc);
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempType, setTempType] = useState("");

  function getLoc(event) {
    setLoc(event.target.value);
  }

  function getLoc1() {
  
    var fetchData = async () => {
    
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${Loc}&units=metric&appid=6e9c29b131bd724e80785ff74ea9c1cd`
      ).then(fetchVal => fetchVal.json()).then(
        (getVal=>{
                    var T = Math.round(getVal.main.temp);
                    if (T > 30) {
                    setLoc1(getVal.name);
                    setTemp(T);
                    setTempType("Warm");
                    setHumidity(getVal.main.humidity);
                    setBgImage(process.env.PUBLIC_URL+"/Images/Summer.jpg");
                    } else if (T < 30 && T >= 0) {
                    setLoc1(getVal.name);
                    setTemp(T);
                    setTempType("Cold");
                    setHumidity(getVal.main.humidity);
                    setBgImage(process.env.PUBLIC_URL+"/Images/Cold.jfif");
                    } else{
                    setLoc1(getVal.name);
                    setTemp(T);
                    setTempType("Snowfall");
                    setHumidity(getVal.main.humidity);
                    setBgImage(process.env.PUBLIC_URL+"/Images/Winter.jpg");
                    }
                  }
          )).catch(error =>alert('Enter Correct CityName'));
  
    };
    fetchData();
  
  }

  return (
    <>
      <div className="container sticky-top nav_bar d-flex justify-content-center align-items-center">
        <img className="forecast_logo me-5" src={process.env.PUBLIC_URL+'/Images/weather-forecast-logo.jpg'} alt="" />
        <input type="text" className="search_bar col-6" placeholder="Search here...Cityname" onChange={getLoc} />
        <button className="btn_size" onClick={getLoc1}>
          <img src={process.env.PUBLIC_URL+"/Images/search-solid.svg"} className="btn_logo" alt="" />
        </button>
      </div>

      <div
        style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", }} className="container nav_barBody d-flex justify-content-center align-items-center" >
        <h2 className="location col-6 tmp_type">
          <img className="location_logo" src={process.env.PUBLIC_URL+"/Images/map-marker-alt-solid.svg"} alt="" />{" "}
          {Loc1}
        </h2>
        <div className="tmp_type col-6">
          <DateTime />
        </div>
        <div className="tmp_show col-6">{temp}°C</div>
        <div className="tmp_type col-6">{tempType}</div>
        <div className="tmp_type col-6">Humidity: {humidity}%</div>
      </div>
    </>
  );
}

export default App;
