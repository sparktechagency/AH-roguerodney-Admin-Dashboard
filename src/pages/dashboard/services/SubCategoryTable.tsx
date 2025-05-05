import { Button, ConfigProvider, Form, Input, Select, Table, UploadFile } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';
import { dummySubCategories } from '../../../dummyData/category';
import { Option } from 'antd/es/mentions';

const SubCategoryTable = () => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);

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
            title: 'Sub-category Image',
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
                <div key={index} className="flex items-center gap-3">
                    <button onClick={() => setEditCategoryModal(true)}>
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
            <Form.Item label="Sub-category Name" name="sub-category">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter sub-category name"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Category</label>} name="recipint">
                <Select defaultValue="Select category" className="w-40 h-[42px]">
                    <Option value="Hair">Hair</Option>
                    <Option value="Nail">Nail</Option>
                    <Option value="Makeup">Makeup</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Sub-category Image" name="image">
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
                        Add Sub-category
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
            <Form.Item label="Sub-category Name" name="sub-category">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter sub-category name"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Category</label>} name="recipint">
                <Select defaultValue="Select category" className="w-40 h-[42px]">
                    <Option value="Hair">Hair</Option>
                    <Option value="Nail">Nail</Option>
                    <Option value="Makeup">Makeup</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Sub-category Image" name="image">
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
                        Add Sub-category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Sub-categories</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setCategoryModal(true)}>
                    <Plus size={20} /> Add Sub-category
                </Button>
            </div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummySubCategories} />
            </ConfigProvider>

            <CustomModal
                open={categoryModal}
                setOpen={setCategoryModal}
                title="Add category"
                width={500}
                body={addCategoryForm}
            />
            <CustomModal
                open={editCategoryModal}
                setOpen={setEditCategoryModal}
                title="Edit category"
                width={500}
                body={editServiceForm}
            />
        </div>
    );
};

export default SubCategoryTable;
