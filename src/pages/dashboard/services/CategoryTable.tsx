import { Button, ConfigProvider, Form, Input, Table, UploadFile } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';

const dummyCategories = [
    {
        id: '01',
        name: 'Hair',
        images: [
            {
                id: '01',
                path: 'https://www.shutterstock.com/image-photo/portrait-beautiful-girl-luxurious-curly-600nw-2250115561.jpg',
            },
            {
                id: '02',
                path: 'https://www.shutterstock.com/image-photo/portrait-beautiful-girl-luxurious-curly-600nw-2250115561.jpg',
            },
            {
                id: '03',
                path: 'https://www.shutterstock.com/image-photo/portrait-beautiful-girl-luxurious-curly-600nw-2250115561.jpg',
            },
            {
                id: '04',
                path: 'https://www.shutterstock.com/image-photo/portrait-beautiful-girl-luxurious-curly-600nw-2250115561.jpg',
            },
            {
                id: '05',
                path: 'https://www.shutterstock.com/image-photo/portrait-beautiful-girl-luxurious-curly-600nw-2250115561.jpg',
            },
        ],
    },
    {
        id: '02',
        name: 'Nail',
        images: [
            {
                id: '01',
                path: 'https://coffeeandnailpolish.com/wp-content/uploads/2018/03/img_0136.jpg?w=525',
            },
            {
                id: '02',
                path: 'https://coffeeandnailpolish.com/wp-content/uploads/2018/03/img_0136.jpg?w=525',
            },
            {
                id: '03',
                path: 'https://coffeeandnailpolish.com/wp-content/uploads/2018/03/img_0136.jpg?w=525',
            },
            {
                id: '04',
                path: 'https://coffeeandnailpolish.com/wp-content/uploads/2018/03/img_0136.jpg?w=525',
            },
            {
                id: '05',
                path: 'https://coffeeandnailpolish.com/wp-content/uploads/2018/03/img_0136.jpg?w=525',
            },
        ],
    },
    {
        id: '03',
        name: 'Makeup',
        images: [
            {
                id: '01',
                path: 'https://play-lh.googleusercontent.com/g9q88R0vuZrOl7A8uhQ8e5TgzU-F4CDARXJJVsg9Q-LcVIpJ8Bffp8L-nfNKWcs7d6U',
            },
            {
                id: '02',
                path: 'https://play-lh.googleusercontent.com/g9q88R0vuZrOl7A8uhQ8e5TgzU-F4CDARXJJVsg9Q-LcVIpJ8Bffp8L-nfNKWcs7d6U',
            },
            {
                id: '03',
                path: 'https://play-lh.googleusercontent.com/g9q88R0vuZrOl7A8uhQ8e5TgzU-F4CDARXJJVsg9Q-LcVIpJ8Bffp8L-nfNKWcs7d6U',
            },
            {
                id: '04',
                path: 'https://play-lh.googleusercontent.com/g9q88R0vuZrOl7A8uhQ8e5TgzU-F4CDARXJJVsg9Q-LcVIpJ8Bffp8L-nfNKWcs7d6U',
            },
            {
                id: '05',
                path: 'https://play-lh.googleusercontent.com/g9q88R0vuZrOl7A8uhQ8e5TgzU-F4CDARXJJVsg9Q-LcVIpJ8Bffp8L-nfNKWcs7d6U',
            },
        ],
    },
];

const CategoryTable = () => {
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
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category Images',
            dataIndex: 'images',
            key: 'images',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    {record?.images?.map((item: any) => (
                        <img src={item?.path} className="size-9 rounded-sm" />
                    ))}
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
            <Form.Item label="Category Name" name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter category name"
                />
            </Form.Item>
            <Form.Item label="Category Images" name="images">
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
                        Add category
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
            <Form.Item label="Category Name" name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter category name"
                />
            </Form.Item>

            <Form.Item label="Category Images" name="images">
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
                        Edit category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Categories</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setCategoryModal(true)}>
                    <Plus size={20} /> Add Category
                </Button>
            </div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyCategories} />
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

export default CategoryTable;
