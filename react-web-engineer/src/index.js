import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Continents from "./pages/continents/Continents";
import ContinentsName from "./pages/continents/ContinentsName";
import ContinentsYear from "./pages/continents/ContinentsYear";
import ContinentsYearYear from "./pages/continents/ContinentsYearYear";

import Countries from "./pages/countries/Countries";
import CountriesISO from "./pages/countries/CountriesISO";
import CountriesYear from "./pages/countries/CountriesYear";
import CountriesYearYear from "./pages/countries/CountriesYearYear";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/{iso}" element={<CountriesISO />} />
          <Route path="countries/{iso}/year{year}" element={<CountriesYearYear />} />
          <Route path="countries/{iso}/{year}" element={<CountriesYear />} />

          <Route path="continents" element={<Continents />} />
          <Route path="continents/{name}" element={<ContinentsName />} />
          <Route path="continents/{name}/year{year}" element={<ContinentsYearYear />} />
          <Route path="continents/{name}/{year}" element={<ContinentsYear />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

