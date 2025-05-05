import { Button, ConfigProvider, Form, Input, Select, Table, UploadFile } from 'antd';
import { Info, Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';
import { Option } from 'antd/es/mentions';
import { dummyServiceData } from '../../../dummyData/service';

const ServiceTable = () => {
    const [serviceModal, setServiceModal] = useState(false);
    const [editServiceModal, setEditServiceModal] = useState(false);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Sub-category',
            dataIndex: 'subCategory',
            key: 'subCategory',
        },
        {
            title: 'Service',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Service Image',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img src={record?.image} className="size-9 rounded-sm" />
                </div>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, _record: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                    <button>
                        <Info className="text-xl text-primary" />
                    </button>
                    <button onClick={() => setEditServiceModal(true)}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button>
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    const addCategoryForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label={<label className="font-medium">Category</label>} name="category">
                <Select defaultValue="Select category" className="w-40 h-[42px]">
                    <Option value="Hair">Hair</Option>
                    <Option value="Nail">Nail</Option>
                    <Option value="Makeup">Makeup</Option>
                </Select>
            </Form.Item>

            <Form.Item label={<label className="font-medium">Sub-category</label>} name="sub-cateogry">
                <Select defaultValue="Select sub-category" className="w-40 h-[42px]">
                    <Option value="Braids & Twists">Braids & Twists</Option>
                    <Option value="Natural Glam">Natural Glam</Option>
                    <Option value="Weaves & Extensions">Weaves & Extensions</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Service Name" name="service">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter service name"
                />
            </Form.Item>

            <Form.Item label="Base Price" name="price">
                <Input
                    type="number"
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter base price"
                />
            </Form.Item>

            <Form.Item label="Add-Ons" name="add-ons">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter add-ons name"
                />

                <div className="flex items-center gap-2 mt-2">
                    <Input
                        type="number"
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter add-ons price"
                    />
                    <Button style={{ height: 42 }} className="text-primary border-primary">
                        <Plus size={20} /> Add
                    </Button>
                </div>
            </Form.Item>

            <Form.Item label="Service Image" name="image">
                <UploadImage fileList={fileList} setFileList={setFileList} />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary"
                        style={{
                            height: 40,
                        }}
                        className="w-full"
                    >
                        Add Service
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
    const editServiceForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label={<label className="font-medium">Category</label>} name="category">
                <Select defaultValue="Select category" className="w-40 h-[42px]">
                    <Option value="Hair">Hair</Option>
                    <Option value="Nail">Nail</Option>
                    <Option value="Makeup">Makeup</Option>
                </Select>
            </Form.Item>

            <Form.Item label={<label className="font-medium">Sub-category</label>} name="sub-cateogry">
                <Select defaultValue="Select sub-category" className="w-40 h-[42px]">
                    <Option value="Braids & Twists">Braids & Twists</Option>
                    <Option value="Natural Glam">Natural Glam</Option>
                    <Option value="Weaves & Extensions">Weaves & Extensions</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Service Name" name="service">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter service name"
                />
            </Form.Item>

            <Form.Item label="Base Price" name="price">
                <Input
                    type="number"
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter base price"
                />
            </Form.Item>

            <Form.Item label="Add-Ons" name="add-ons">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter add-ons name"
                />

                <div className="flex items-center gap-2 mt-2">
                    <Input
                        type="number"
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter add-ons price"
                    />
                    <Button style={{ height: 42 }} className="text-primary border-primary">
                        <Plus size={20} /> Add
                    </Button>
                </div>
            </Form.Item>

            <Form.Item label="price Image" name="image">
                <UploadImage fileList={fileList} setFileList={setFileList} />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Add Service
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Services</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setServiceModal(true)}>
                    <Plus size={20} /> Add Service
                </Button>
            </div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyServiceData} />
            </ConfigProvider>

            <CustomModal
                open={serviceModal}
                setOpen={setServiceModal}
                title="Add Service"
                width={500}
                body={addCategoryForm}
            />
            <CustomModal
                open={editServiceModal}
                setOpen={setEditServiceModal}
                title="Edit Service"
                width={500}
                body={editServiceForm}
            />
        </div>
    );
};

export default ServiceTable;
