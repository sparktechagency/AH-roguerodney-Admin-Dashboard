import { Table, Avatar, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery, useUpdateUserMutation } from '../../../redux/features/user/userApi';
import toast from 'react-hot-toast';
import { Option } from 'antd/es/mentions';
const UserDetails = () => {
    const { id } = useParams();
    const { data } = useGetSingleUserQuery({ id });
    const userData = data?.data?.user;
    const orderData = data?.data?.userRecentOrderData;

    const [updateUser] = useUpdateUserMutation();
    console.log(userData);

    const columns = [
        {
            title: 'S. no.',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            render: (item: any) => (
                <div className="flex items-center gap-2">
                    <Avatar size="small" src="https://i.pravatar.cc/100" />
                    <div>
                        <div className="text-sm font-medium">{item?.name}</div>
                        <div className="text-xs text-gray-500">{item?.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Provider',
            dataIndex: 'provider',
            key: 'provider',
            render: (item: any) => (
                <div className="flex items-center gap-2">
                    <Avatar size="small" src="https://i.pravatar.cc/100" />
                    <div>
                        <div className="text-sm font-medium">{item?.name}</div>
                        <div className="text-xs text-gray-500">{item?.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Service location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Appt. time',
            dataIndex: 'time',
            key: 'time',
        },
    ];

    // handle update user
    const handleUpdateUser = async (value: string) => {
        toast.loading('Updating...', { id: 'update-user' });
        try {
            const res = await updateUser({ payload: { verified: value }, id }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'User updated successfully', { id: 'update-user' });
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update', { id: 'update-user' });
            console.error(error);
        }
    };
    console.log(userData?.verified);

    return (
        <div>
            <div className="p-6 rounded-xl shadow-md bg-white  mx-auto ">
                <h2 className="text-center text-[28px] font-bold text-primary mb-4">Client info</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[46px]">
                    {/* Client Info Card */}
                    <div className="border rounded-xl p-5 ">
                        <div>
                            <div className="flex justify-start items-center gap-3 ">
                                <img
                                    src="/user.svg"
                                    alt="Client"
                                    className="w-[114px] h-[114px] rounded-full object-cover mt-1"
                                />

                                <div>
                                    <h3 className="text-xl  font-normal text-primary pb-1">{userData?.name}</h3>
                                    <p className="text-[16px] text-[#929292] ">{userData?.email}</p>
                                </div>
                            </div>

                            <div className="text-sm space-y-3 pt-3">
                                <p className=" flex items-center justify-between text-[16px]">
                                    <span className="font-medium">Contact :</span>
                                    <span> {userData?.contact || 'N/A'} </span>
                                </p>
                                <p className=" flex items-center justify-between text-[16px]">
                                    <span className="font-medium">Location :</span>
                                    <span> {userData?.location || 'N/A'} </span>
                                </p>
                                <p className=" flex items-center justify-between text-[16px]">
                                    <span className="font-medium">Joining Date :</span>
                                    <span> {new Date(userData?.createdAt).toLocaleDateString()} </span>
                                </p>
                                <div className="flex items-center justify-between text-[16px]">
                                    <p className="font-medium">Status:</p>
                                    <Select
                                        value={userData?.verified ? 'true' : 'false'}
                                        onSelect={(value) => handleUpdateUser(value)}
                                        className="w-28 h-[35px]"
                                    >
                                        <Option value={'true'}>Active</Option>
                                        <Option value={'false'}>Inactive</Option>
                                    </Select>
                                </div>
                                <p className=" flex items-center justify-between text-[16px]">
                                    <span className="font-medium">Subscription Plan : </span>
                                    <span> {userData?.subscription?.package?.name} </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Plan Card */}
                    <div className="border rounded-xl p-5">
                        <h3 className="text-xl font-semibold text-primary mb-4">Subscription Plan</h3>

                        <div className="text-sm space-y-3">
                            <p className=" flex items-center justify-between text-[16px]">
                                <span className="font-medium">Package Name :</span>
                                <span>{userData?.subscription?.package?.name}</span>
                            </p>
                            <p className=" flex items-center justify-between text-[16px]">
                                <span className="font-medium">Package Validity :</span> <span> 1 month</span>
                            </p>
                            <p className=" flex items-center justify-between text-[16px]">
                                <span className="font-medium">Price :</span>
                                <span> $ {userData?.subscription?.price} </span>
                            </p>
                            <p className=" flex items-center justify-between text-[16px]">
                                <span className="font-medium">Start Date :</span>
                                <span>{userData?.subscription?.currentPeriodStart.split('T')[0]}</span>
                            </p>
                            <p className=" flex items-center justify-between text-[16px]">
                                <span className="font-medium">End Date :</span>
                                <span>{userData?.subscription?.currentPeriodEnd.split('T')[0]}</span>
                            </p>
                            <p className="flex items-center justify-between text-[16px]">
                                <span className="font-medium">Status :</span>
                                <Select value={userData?.subscription?.status} onSelect={(value) => console.log(value)} className="w-28 h-[35px]">
                                    <Option value={'active'}>Active</Option>
                                    <Option value={'inactive'}>Inactive</Option>
                                </Select>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Table columns={columns} dataSource={orderData} />
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
