import BookingTable from './BookingTable';

const BookingsPage = () => {
    return (
        <div className="grid gap-4 p-4">
            <div>
                <h1 className="text-3xl text-primary font-semibold">Manage Bookings</h1>
            </div>
            <BookingTable />
        </div>
    );
};

export default BookingsPage;
