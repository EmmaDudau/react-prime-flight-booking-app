import axios from 'axios';


const REST_API_URL = 'http://localhost:8080'

class BookingService {
    getBookings(){
        return axios.get(REST_API_URL + '/booking');
    }

    createBooking(booking){
        return axios.post(REST_API_URL + '/booking', booking)
    }


    getBookingById(bookingId){
        return axios.get(REST_API_URL + '/booking/' +  bookingId);
    }


    updateBooking(bookingId, booking){
        return axios.put(REST_API_URL + '/booking/' +bookingId, booking);
    }

    deleteBooking(bookingId){
        return axios.delete(REST_API_URL + '/' + bookingId);
    }

}

export default new BookingService();
