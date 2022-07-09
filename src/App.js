import React, {useState} from 'react';
import './App.css';

function App() {

  const API_KEY = 'b81750490ef664974ca5d4668c91bf2d'
  const [weatherData, setWeatherData] = useState([]) //state to hold data from fetch request
  const [city, setCity] = useState('') //state to hold data from input box

  //function to call the api and return information on the press of the ENTER key
  const getWeather = (event) => {
    if (event.key == 'Enter'){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
      .then(response => response.json()) //get response from fetch request and convert to json
      .then(data => {setWeatherData(data)  //get response and send it to the state variable
                      setCity('')})  //reset city state to empty for the next search

      console.log(API_KEY)
    }
  }

  return (
    <div className='container'>
      <input 
      className='input' 
      placeholder='Enter town or city'
      onChange={e => setCity(e.target.value)}
      value={city}
      onKeyPress={getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Please type in a city or town and then press the ENTER key.</p>
        </div>
      ): (
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>
      )}

    </div>
  );
}

export default App;
