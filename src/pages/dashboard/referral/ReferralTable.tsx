import { ConfigProvider, Table } from 'antd';
import { dummyReferralsData } from '../../../dummyData/referrals';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import { Info } from 'lucide-react';

const ReferralTable = () => {
    const [detailsModal, setDetailsModal] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Referral  User',
            dataIndex: 'referralUser',
            key: 'referralUser',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img src={record?.referralUser?.image} alt="referralUser img" className="size-10" />
                    <div>
                        <h1 className="font-medium">{record?.referralUser?.name}</h1>
                        <h3 className="text-sm">{record?.referralUser?.email}</h3>
                    </div>
                </div>
            ),
        },
        {
            title: 'Token User',
            dataIndex: 'tokenUser',
            key: 'tokenUser',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img src={record?.tokenUser?.image} alt="tokenUser img" className="size-10" />
                    <div>
                        <h1 className="font-medium">{record?.tokenUser?.name}</h1>
                        <h3 className="text-sm">{record?.tokenUser?.email}</h3>
                    </div>
                </div>
            ),
        },
        {
            title: 'Bonus',
            dataIndex: 'bonus',
            key: 'bonus',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <div>
                        <h1 className="font-medium">${record?.bonus}</h1>
                    </div>
                </div>
            ),
        },
        {
            title: 'Referral Date',
            dataIndex: 'referralDate',
            key: 'referralDate',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, _record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button onClick={() => setDetailsModal(true)}>
                        <Info className="text-xl text-primary" />
                    </button>
                </div>
            ),
        },
    ];

    const referralDetailsModal = (
        <ul className="">
            <li className="grid grid-cols-3">
                <span>Referral User Name</span>
                <span>:</span>
                <span className="text-right">Candice</span>
            </li>
            <li className="grid grid-cols-3">
                <span>Referral User Email</span>
                <span>:</span>
                <span className="text-right">candice@gmail.com</span>
            </li>
            <li className="grid grid-cols-3">
                <span>Token User Name</span>
                <span>:</span>
                <span className="text-right">Candice</span>
            </li>
            <li className="grid grid-cols-3">
                <span>Token User Email</span>
                <span>:</span>
                <span className="text-right">candice@gmail.com</span>
            </li>
            <li className="grid grid-cols-3">
                <span>Bonus</span>
                <span>:</span>
                <span className="text-right">$130</span>
            </li>
            <li className="grid grid-cols-3">
                <span>Referral Date</span>
                <span>:</span>
                <span className="text-right"> 2/11/12;02:00PM</span>
            </li>
        </ul>
    );

    return (
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyReferralsData} />
            </ConfigProvider>
            <CustomModal
                open={detailsModal}
                setOpen={setDetailsModal}
                title="Referral Details"
                width={500}
                body={referralDetailsModal}
            />
        </div>
    );
};

export default ReferralTable;
