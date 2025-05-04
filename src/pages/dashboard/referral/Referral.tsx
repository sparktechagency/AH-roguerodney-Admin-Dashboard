import ReferralTable from './ReferralTable';

const ReferralPage = () => {
    return (
        <div className='p-4 grid gap-4'>
            <div>
                <h1 className="text-3xl text-primary font-semibold">Manage Referrals</h1>
            </div>
            <ReferralTable />
        </div>
    );
};

export default ReferralPage;
