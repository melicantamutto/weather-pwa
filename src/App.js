import Header from "./components/Header";
import Form from "./components/Form";
import Climate from "./components/Climate";
import "./App.css";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";

const App = () => {
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });

  const [readyToFetch, setReadyToFetch] = useState(false);
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [respOpenMap, setRespOpenMap] = useState({});
  const [respTuTiempo, setTuTiempo] = useState({});
  const [respGoogle, setGoogle] = useState({});
  const appIdOpenMap = process.env.REACT_APP_OPEN_MAP_API_KEY;
useEffect(() => {
  if(localStorage.getItem('lastSearch')){
    const lastSearch = localStorage.getItem('lastSearch');
    setSearch(JSON.parse(lastSearch));
    setReadyToFetch(true);
  }
  
}, []);

  useEffect(() => {
    const fetchApi = async () => {
      if (readyToFetch) {
        const { city, country } = search;
        const urlOpenMap = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appIdOpenMap}`;
        const resp = await fetch(urlOpenMap);
        const obj = await resp.json();
        setRespOpenMap(obj);
        if (respOpenMap.cod === "404") {
          setInvalidSearch(true);
        } else {
          setInvalidSearch(false);
        }
      }
    };
    fetchApi();
    setReadyToFetch(false);
  }, [readyToFetch]);

  return (
    <div className="App">
      <Header title="Weather App" />
      <div className="container-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form search={search} setSearch={setSearch} setReadyToFetch={setReadyToFetch} />
            </div>
            <div className="col m6 s12">
              <Climate respGoogle={respGoogle} respTuTiempo={respTuTiempo} respOpenMap={respOpenMap} invalidSearch={invalidSearch} />
            </div>
          </div>
        </div>
      </div> 
      <Footer />
    </div>
  );
};

export default App;
