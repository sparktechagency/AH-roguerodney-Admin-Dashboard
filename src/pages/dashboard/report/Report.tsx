import ReportTable from './ReportTable';

const ReportPage = () => {
    return (
        <div className="grid gap-4 p-4">
            <div>
                <h1 className="text-3xl text-primary font-semibold">Manage Reports</h1>
            </div>
            <ReportTable />
        </div>
    );
};

export default ReportPage;
