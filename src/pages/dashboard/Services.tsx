import {
    Button,
    ConfigProvider,
    Flex,
    Form,
    GetProp,
    Image,
    Input,
    Table,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';

import CustomModal from '../../components/shared/CustomModal';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

import { AiOutlineEdit } from 'react-icons/ai';
import { Plus } from 'lucide-react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const Services = () => {
    const [serviceModal, setServiceModal] = useState(false);
    const [editServiceModal, setEditServiceModal] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const services = [
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

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            type="button"
        >
            <Plus />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const addServiceForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label="Service Name" name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter Service Name"
                />
            </Form.Item>
            <Form.Item label="Service Images" name="images">
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
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
    const editServiceForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label="Service Name" name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter Service Name"
                />
            </Form.Item>

            <Form.Item label="Service Images" name="images">
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Edit Service
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Service Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Service Images',
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
    return (
        <div>
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Manage Services</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setServiceModal(true)}
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add Service
                    </Button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table columns={columns} dataSource={services} />
            </ConfigProvider>

            <CustomModal
                open={serviceModal}
                setOpen={setServiceModal}
                title="Add Service"
                width={500}
                body={addServiceForm}
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

export default Services;
