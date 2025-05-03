import BookingTable from './BookingTable';

const BookingsPage = () => {
    return (
        <div>
            <div className="py-4">
                <h1 className="text-3xl text-primary font-semibold">Manage Bookings</h1>
            </div>
            <BookingTable />
        </div>
    );
};

export default BookingsPage;
