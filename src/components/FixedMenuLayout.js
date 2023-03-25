import React from 'react';
import { Menubar } from 'primereact/menubar';

const FixedMenuLayout = () => {
    const items = [
        {
            label: 'Aloha Air',
            icon: 'pi pi-fw pi-sun',
            url: 'http://localhost:3000'

        },
        {
            label: 'Fly with us',
            icon: 'pi pi-fw pi-telegram',
            url: 'http://localhost:3000/book-a-flight'


        },
        {
            label: 'Manage Bookings',
            icon: 'pi pi-fw pi-calendar',
            url: 'http://localhost:3000/manage-booking'



        },
        {
            label: 'About us',
            icon: 'pi pi-fw pi-id-card',
            url: 'http://localhost:3000/about'


        }
    ];


    return (
        <div>
            <div className="card">
                <Menubar model={items}/>
            </div>
        </div>
    );
}
export default FixedMenuLayout;