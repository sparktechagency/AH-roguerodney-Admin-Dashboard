import { ConfigProvider, Table } from 'antd';
import { useState } from 'react';
import { PencilLine, Trash2 } from 'lucide-react';
import { useDeleteChallengeMutation, useGetAllChallengesQuery } from '../../../redux/features/challenge/challengeApi';
import toast from 'react-hot-toast';
import DeleteModal from '../../../components/shared/DeleteAlertModal';
import MyModal from '../../../components/shared/MyModal';
import EditChallengeForm from './forms/EditChallengeForm';

type Challenge = {
    _id?: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    number?: number;
    amount?: number;
    role?: string;
    recipint?: string;
};

const BonusAndChallangesTable = () => {
    const [editChallengeModal, setEditChallengeModal] = useState(false);
    const [deleteChallengeModal, setDeleteChallengeModal] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | undefined>(undefined);

    const { data, isLoading } = useGetAllChallengesQuery({ query: '' });
    const challengesData = data?.data;

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <h1>{record?.name}</h1>
                </div>
            ),
        },
        {
            title: 'Description',
            key: 'description',
            render: (_: any, record: any) => (
                <h1 className="">
                    {record?.description
                        ? record.description.split(' ').slice(0, 5).join(' ') +
                          (record.description.split(' ').length > 5 ? ' ...' : '')
                        : ''}
                </h1>
            ),
        },
        {
            title: 'Start Date',
            key: 'startDate',
            render: (_: any, record: any, index: number) => <h1 key={index}>{record?.startDate?.split('T')[0]}</h1>,
        },
        {
            title: 'End Date',
            key: 'endDate',
            render: (_: any, record: any, index: number) => <h1 key={index}>{record?.endDate?.split('T')[0]}</h1>,
        },
        {
            title: 'Required Number',
            key: 'requiredNumber',
            render: (_: any, record: any, index: number) => <h1 key={index}>{record?.number}</h1>,
        },
        {
            title: 'Bonus Amount',
            key: 'bonusAmount',
            render: (_: any, record: any, index: number) => <h1 key={index}>${record?.amount}</h1>,
        },
        {
            title: 'Role',
            key: 'role',
            render: (_: any, record: any, index: number) => (
                <h1 key={index}>{record?.role?.toLowerCase().replace(/^\w/, (c: any) => c.toUpperCase())}</h1>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                    <PencilLine
                        onClick={() => {
                            setEditChallengeModal(true);
                            setActiveChallenge(item);
                        }}
                        size={20}
                        className="text-xl cursor-pointer"
                    />
                    <Trash2
                        onClick={() => {
                            setDeleteChallengeModal(true);
                            setActiveChallenge(item);
                        }}
                        size={20}
                        className="text-xl cursor-pointer text-red-500"
                    />
                </div>
            ),
        },
    ];

    // handle delete challenge
    const [deleteChallenge] = useDeleteChallengeMutation();
    const handleDelete = async () => {
        toast.loading('Deleting challenge...', { id: 'delete-challenge' });
        try {
            const res = await deleteChallenge({ id: activeChallenge?._id }).unwrap();
            if (res?.success) {
                toast.success('Challenge deleted successfully', { id: 'delete-challenge' });
                setDeleteChallengeModal(false);
                setActiveChallenge(undefined);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete challenge', { id: 'delete-challenge' });
        }
    };

    return (
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={challengesData} loading={isLoading} />
            </ConfigProvider>

            {/* edit modal */}
            <MyModal open={editChallengeModal} setOpen={setEditChallengeModal} width={500}>
                <EditChallengeForm setModalOpen={setEditChallengeModal} itemData={activeChallenge} />
            </MyModal>

            <DeleteModal open={deleteChallengeModal} setOpen={setDeleteChallengeModal} action={handleDelete} />
        </div>
    );
};

export default BonusAndChallangesTable;
