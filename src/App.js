import React from 'react';
import FixedMenuLayout from './components/FixedMenuLayout';
import {Routes} from "react-router";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Booking from "./components/Booking";
import Flights from "./components/Flights";
import Home from "./components/Home";
import ManageBookings from "./components/ManageBookings";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <div className="App">
        <Router>
            <FixedMenuLayout></FixedMenuLayout>
            <Routes>
                <Route exact path="/" element = {<Home/>}></Route>
                <Route path="/book-a-flight" element={<Flights/>}></Route>
                <Route path="/edit-booking/:id" element={<Flights/>}></Route>
                <Route path="/manage-booking" element={<ManageBookings/>}></Route>
                <Route path="/booking" element={<Booking/>}></Route>
                <Route path="/about" element={<AboutUs/>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
