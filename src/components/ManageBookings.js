import React, {useState, useEffect, useRef} from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import BookingService from "../services/BookingService";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import {Calendar} from "primereact/calendar";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";




const ManageBookings = () => {
    let navigate = useNavigate();
    let emptyBooking = {
        id: null,
        departure: null,
        arrival: null,
        flyOutDate: null,
        flyReturnDate: null
    };

    const [bookings, setBookings] = useState([]);
    const [bookingDialog, setBookingDialog] = useState(false);
    const [editingRows, setEditingRows] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [booking, setBooking] = useState(emptyBooking);
    const [deleteBookingDialog, setDeleteBookingDialog] = useState(false);
    const [deleteBookingsDialog, setDeleteBookingsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedBookings, setSelectedBookings] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [selectedID, setSelectedID] = useState("");
    const [departure1, setDeparture1] = useState(null);
    const [arrival1, setArrival1] = useState(null);
    const [flyOutDate, setFlyOutDate] = useState(null);
    const [flyReturnDate, setFlyReturnDate] = useState(null);



    const cities = [
        {name: 'New York', code: 'New York'},
        {name: 'Rome', code: 'Rome'},
        {name: 'London', code: 'London'},
        {name: 'Istanbul', code: 'Istanbul'},
        {name: 'Paris', code: 'Paris'}
    ];


    useEffect(() => {
        getBookings()
    }, []);

    const getBookings = () => {
        BookingService.getBookings().then((response) => {
            setBookings(response.data)
        });
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBookingDialog(false);
    }

    const hideDeleteBookingDialog = () => {
        setDeleteBookingDialog(false);
    }

    const hideDeleteBookingsDialog = () => {
        setDeleteBookingsDialog(false);
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    const saveBooking = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const departure = departure1.name
        const arrival = arrival1.name
        const id = selectedID;
        const booking = {id, departure, arrival, flyOutDate, flyReturnDate};

        BookingService.updateBooking(selectedID, booking).then((response) => {
                navigate('/booking')
            }).catch(error => {
                console.log(error)
            })
        }


    const editBooking = (booking) => {
        const val1  = {name: booking.departure, code: booking.departure};
        const val2  = {name: booking.arrival, code: booking.arrival};
        setSelectedID(booking.id);
        setDeparture1(val1);
        setArrival1(val2);
        setFlyOutDate(booking.flyOutDate);
        setFlyReturnDate(booking.flyReturnDate);
        setBooking({...booking});
        setBookingDialog(true);
        console.log(booking);

    }


    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }




    const confirmDeleteBooking = (booking) => {
        setBooking(booking);
        setDeleteBookingDialog(true);
    }

    const deleteBooking = () => {
        let _bookings = bookings.filter(val => val.id !== booking.id);
        setBookings(_bookings);
        setDeleteBookingsDialog(false);
        setBooking(emptyBooking);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Booking Deleted', life: 3000 });
    }

    const confirmDeleteSelected = () => {
        setDeleteBookingsDialog(true);
    }

    const deleteSelectedBookings = () => {
        let _bookings = bookings.filter(val => !selectedBookings.includes(val));
        setBookings(_bookings);
        setDeleteBookingsDialog(false);
        setSelectedBookings(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Bookings Deleted', life: 3000 });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editBooking(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteBooking(rowData)} />
            </React.Fragment>
        );
    }


    const bookingDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveBooking} />
        </React.Fragment>
    );
    const deleteBookingDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBookingDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteBooking} />
        </React.Fragment>
    );
    const deleteBookingsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBookingsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedBookings} />
        </React.Fragment>
    );

    const onCityChange1 = (e) => {
        setDeparture1(e.value);
        console.log(e.value);
    }
    const onCityChange2 = (e) => {
        setArrival1(e.value);
        console.log(e.value);
    }

    const onDepartureChange1 = (e) => {
        console.log(e.value)
        setFlyOutDate(e.value);
    }
    const onDepartureChange2 = (e) => {
        setFlyReturnDate(e.value);
    }



    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={bookings} selection={selectedBookings} onSelectionChange={(e) => setSelectedBookings(e.value)}
                           globalFilter={globalFilter} responsiveLayout="scroll">
                    <Column field="id" header="id" value={bookings.id}></Column>
                    <Column field="departure" header="departure" value={bookings.departure}  style={{ width: '20%' }}></Column>
                    <Column field="arrival" header="arrival"  value={bookings.arrival} style={{ width: '20%' }}></Column>
                    <Column field="flyOutDate" header="flyOutDate" value={bookings.flyOutDate}></Column>
                    <Column field="flyReturnDate" header="flyReturnDate" value={bookings.flyReturnDate}></Column>
                    <Column rowEditor headerStyle={{width: '10%', minWidth: '8rem'}}
                            bodyStyle={{textAlign: 'center'}}></Column>
                    <Column body={actionBodyTemplate} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={bookingDialog} style={{ width: '450px'}} header="Booking Details" modal className="p-fluid" footer={bookingDialogFooter}
            onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="departure">Select departure city</label>
                    <Dropdown value={departure1} options={cities} onChange={onCityChange1} optionLabel="name" placeholder="Select a City" />
                    <label htmlFor="arrival">Select arrival city</label>
                    <Dropdown value={arrival1} options={cities} onChange={onCityChange2} optionLabel="name" placeholder="Select a City" />
                    <label htmlFor="flyOutDate">Select fly out date</label>
                    <Calendar dateFormat="dd/mm/yy" value={new Date(booking.flyOutDate)} onChange={onDepartureChange1}></Calendar>
                    <label htmlFor="flyReturnDate">Select return date</label>
                    <Calendar dateFormat="dd/mm/yy" value={new Date(booking.flyReturnDate)} onChange={onDepartureChange2}></Calendar>

                </div>
            </Dialog>



            <Dialog visible={deleteBookingDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteBookingDialogFooter} onHide={hideDeleteBookingDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {booking && <span>Are you sure you want to delete <b>{booking.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteBookingsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteBookingsDialogFooter} onHide={hideDeleteBookingsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {booking && <span>Are you sure you want to delete the selected bookings?</span>}
                </div>
            </Dialog>



        </div>
    )
}

export default ManageBookings;