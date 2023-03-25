import React, {useState, useEffect} from "react";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {Calendar} from "primereact/calendar";
import BookingService from "../services/BookingService";
import { Panel } from 'primereact/panel';



const Flights = () => {
    const [departure, setDeparture] = useState(null);
    const [arrival, setArrival] = useState('');
    const [flyOutDate, setFlyOutDate] = useState('');
    const [flyReturnDate, setFlyReturnDate] = useState('');
    let navigate = useNavigate();
    const {id} = useParams();


    const cities = [
        {name: 'New York', code: 'New York'},
        {name: 'Rome', code: 'Rome'},
        {name: 'London', code: 'London'},
        {name: 'Istanbul', code: 'Istanbul'},
        {name: 'Paris', code: 'Paris'}
    ]



    const saveOrUpdateBooking = (e) => {
        e.preventDefault();

        console.log(departure, arrival, flyOutDate, flyReturnDate)
        const booking = {id, departure, arrival, flyOutDate, flyReturnDate}

        if (id) {

            BookingService.updateBooking(id, booking).then((response) => {
                navigate('/booking')
            }).catch(error => {
                console.log(error)
            })

        } else {
            setFlyOutDate(flyReturnDate.f)
            BookingService.createBooking(booking).then((response) => {

                console.log(response.data)
                navigate('/booking');

            }).catch(error => {
                console.log(error)
            })
        }
    }


    useEffect(() => {
        if (id != null) {
            BookingService.getBookingById(id).then((response) => {
                setDeparture(response.data.departure)
                setArrival(response.data.arrival)
                setFlyOutDate(response.data.flyOutDate);
                setFlyReturnDate(response.data.flyReturnDate);
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])



    return (
        <div>
            <Panel header="Book your flight">
            <div className="card">
                <h5>Select departure</h5>
                <Dropdown optionLabel="name" optionValue="code" value={departure} options={cities} onChange={(e) => setDeparture(e.value)} placeholder="Select a City"/>

                <h5>Select destination</h5>
                <Dropdown optionLabel="name" optionValue="code" value={arrival} options={cities} onChange={(e) => setArrival(e.value)} placeholder="Select a City"/>

            </div>
            <div>
                <br></br>
                <Calendar dateFormat="dd/mm/yy"  value={flyOutDate} required={true} onChange={(e) => setFlyOutDate(e.value)}></Calendar>
                <Calendar dateFormat="dd/mm/yy" value={flyReturnDate} required="true" onChange={(e) => setFlyReturnDate(e.value)}></Calendar>
            </div>
            <br></br>
            <Button label="Book Flight" onClick={saveOrUpdateBooking}></Button>
            </Panel>
        </div>
    )
}



export default Flights;
