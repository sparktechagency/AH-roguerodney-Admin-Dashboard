import { Table, Input, Select } from 'antd';
import { Info, Search } from 'lucide-react';
import { useGetAllUsersQuery, useUpdateUserMutation } from '../../../redux/features/user/userApi';
import { useUpdateSearchParams } from '../../../utils/updateSearchParams';
import { getSearchParams } from '../../../utils/getSearchParams';
import toast from 'react-hot-toast';
import { useState } from 'react';
import MyModal from '../../../components/shared/MyModal';
import { IMAGE_URL } from '../../../redux/api/baseApi';

const { Option } = Select;

const Artists = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(null);
    console.log(activeItem);

    const { searchTerm = '', verified = '' } = getSearchParams();
    const updateSearchParams = useUpdateSearchParams();

    const { data, isLoading } = useGetAllUsersQuery({
        query: `${location.search}${location.search ? '&role=ARTIST' : '?role=ARTIST'}`,
    });
    const usersData = data?.data;
    const pagination = data?.pagination;

    const [updateUser] = useUpdateUserMutation();

    // Column definitions
    const columns = [
        {
            title: 'Artist',
            key: 'artist',
            render: (item: any) => <p>{item?.name}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Subscription Plan',
            key: 'plan',
            render: (item: any) => <a>{item?.subscription?.package?.name}</a>,
        },
        {
            title: 'Joining Date',
            key: 'joiningDate',
            render: (item: any) => <a>{new Date(item?.createdAt).toLocaleDateString()}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (item: any) => {
                return (
                    <div className="flex items-center gap-2">
                        <Select
                            value={item?.verified ? 'true' : 'false'}
                            onSelect={(value) => handleUpdateUser(item?._id, value)}
                            className="w-24 h-[35px]"
                        >
                            <Option value={'true'}>Active</Option>
                            <Option value={'false'}>Inactive</Option>
                        </Select>
                        <button
                            onClick={() => {
                                setModalOpen(true);
                                setActiveItem(item);
                            }}
                            className="text-primary font-semibold rounded-md h-[35px]"
                        >
                            <Info />
                        </button>
                    </div>
                );
            },
        },
    ];

    // handle update user
    const handleUpdateUser = async (id: string, status: any) => {
        toast.loading('Updating user...', { id: 'update-user' });
        try {
            const res = await updateUser({ payload: { verified: status }, id }).unwrap();
            if (res.success) {
                toast.success(res.message || 'User updated successfully', { id: 'update-user' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user', { id: 'update-user' });
        }
    };

    return (
        <div className="grid gap-4 p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl text-[#2C2C2C] font-semibold">Artists</h1>
                </div>
                <div className="flex items-center gap-5 justify-end">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 40,
                        }}
                        placeholder="Search"
                        prefix={<Search size={20} color="#2C2C2C" />}
                        defaultValue={searchTerm}
                        onChange={(e) => updateSearchParams({ searchTerm: e.target.value, page: 1 })}
                    />

                    {/* Dropdown Filter */}
                    <Select
                        onSelect={(value) => updateSearchParams({ verified: value, page: 1 })}
                        value={verified}
                        className="w-32 h-[40px]"
                    >
                        <Option value="">All</Option>
                        <Option value={'true'}>Active</Option>
                        <Option value={'false'}>Inactive</Option>
                    </Select>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={usersData}
                pagination={{
                    total: pagination?.total,
                    pageSize: pagination?.limit,
                    current: pagination?.page,
                    onChange: (page) => {
                        updateSearchParams({ page });
                    },
                }}
                loading={isLoading}
                rowClassName="hover:bg-gray-100"
            />
            <MyModal open={modalOpen} setOpen={setModalOpen} width={500}>
                <div className="text-base space-y-2">
                    <div className="flex justify-center items-center gap-2">
                        <img
                            src={`${IMAGE_URL}${activeItem?.profile}`}
                            alt="profile image"
                            className="size-16 rounded-full"
                        />
                    </div>
                    <p className="grid grid-cols-2 gap-2">
                        <span>Name:</span> <span>{activeItem?.name}</span>
                    </p>
                    <p className="grid grid-cols-2 gap-2">
                        <span>Email:</span> <span>{activeItem?.email}</span>
                    </p>
                    <p className="grid grid-cols-2 gap-2">
                        <span>Date of birth:</span> <span>{activeItem?.dateOfBirth?.split('T')[0]}</span>
                    </p>
                    <p className="grid grid-cols-2 gap-2">
                        <span>State:</span> <span>{activeItem?.state}</span>
                    </p>
                    <p className="grid grid-cols-2 gap-2">
                        <span>City:</span> <span>{activeItem?.city}</span>
                    </p>
                    <p className="grid grid-cols-2 gap-2">
                        <span>Zipcode:</span> <span>{activeItem?.zipCode}</span>
                    </p>
                    <p className="grid grid-cols-2 gap-2">
                        <span>Street:</span> <span>{activeItem?.location}</span>
                    </p>
                </div>
            </MyModal>
        </div>
    );
};

export default Artists;
