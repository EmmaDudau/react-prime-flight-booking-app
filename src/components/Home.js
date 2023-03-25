import React, {useState, useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BookingService from "../services/BookingService";
import axios from "axios";

const Home = () => {
    const [liveFlights, setLiveFlights] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/live-arrivals')
            .then(response => {
                setLiveFlights(response.data)
            });
    }, [])

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };


    return (
        <div>
            <div className="card">
                <DataTable value={liveFlights} responsiveLayout="scroll">
                    <Column field="from" header="From">{liveFlights.from}</Column>
                    <Column field="time" header="Time">{liveFlights.time}</Column>
                    <Column field="status" header="Status">{liveFlights.status}</Column>
                </DataTable>
            </div>
        </div>
    );
}

export default Home;