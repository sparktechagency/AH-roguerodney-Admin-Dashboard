import SupportTable from './SupportTable';

const SupportPage = () => {
    return (
        <div className="grid gap-4 p-4">
            <div>
                <h1 className="text-3xl text-primary font-semibold">Manage Supports</h1>
            </div>
            <SupportTable />
        </div>
    );
};

export default SupportPage;
