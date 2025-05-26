import { ConfigProvider, Table } from 'antd';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import { useGetAllReferralsQuery } from '../../../redux/features/referral/referralApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';

const ReferralTable = () => {
    const [detailsModal, setDetailsModal] = useState(false);

    const { data } = useGetAllReferralsQuery(undefined);
    const referralsData = data?.data;

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_: any, __: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <h1># {index + 1}</h1>
                </div>
            ),
        },
        {
            title: 'Referral  User',
            key: 'referralUser',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img
                        src={
                            item?.token_user?.profile?.includes('http')
                                ? item?.token_user?.profile
                                : `${IMAGE_URL}${item?.token_user?.profile}`
                        }
                        alt="referral_user_img"
                        className="size-10 rounded-full"
                    />
                    <div>
                        <h1 className="font-medium">{item?.referral_user?.name}</h1>
                        <h3 className="text-sm">{item?.referral_user?.email}</h3>
                    </div>
                </div>
            ),
        },
        {
            title: 'Token User',
            dataIndex: 'tokenUser',
            key: 'tokenUser',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img
                        src={
                            item?.token_user?.profile?.includes('http')
                                ? item?.token_user?.profile
                                : `${IMAGE_URL}${item?.token_user?.profile}`
                        }
                        alt="token_user img"
                        className="size-10 rounded-full"
                    />
                    <div>
                        <h1 className="font-medium">{item?.token_user?.name}</h1>
                        <h3 className="text-sm">{item?.token_user?.email}</h3>
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
                        <h1 className="font-medium">${record?.amount}</h1>
                    </div>
                </div>
            ),
        },
        {
            title: 'Referral Date',
            key: 'referralDate',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <div>
                        <h1 className="font-medium">{new Date(record?.createdAt).toLocaleDateString()}</h1>
                    </div>
                </div>
            ),
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_: any, _record: any, index: number) => (
        //         <div key={index} className="flex items-center gap-3">
        //             <button onClick={() => setDetailsModal(true)}>
        //                 <Info className="text-xl text-primary" />
        //             </button>
        //         </div>
        //     ),
        // },
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
                <Table columns={columns} dataSource={referralsData} />
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
