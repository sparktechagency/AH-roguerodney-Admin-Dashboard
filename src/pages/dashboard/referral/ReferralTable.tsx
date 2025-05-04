import { ConfigProvider, Table } from 'antd';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyReferralsData } from '../../../dummyData/referrals';

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
                <Link to={``}>
                    <Info className="text-xl text-primary" />
                </Link>
            </div>
        ),
    },
];

const ReferralTable = () => {
    return (
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyReferralsData} />
            </ConfigProvider>
        </div>
    );
};

export default ReferralTable;
