import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
}

const EditProfile: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string>('/user.svg');
    const [file, setFile] = useState<File | null>(null);

    const onFinish = (values: FormValues) => {
        console.log('Received values of form: ', values);
        values.image = file;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="p-4">
            <div className="pb-4">
                <h1 className="text-3xl text-primary font-semibold">Edit Profile</h1>
            </div>
            <Form
                name="update_profile"
                layout="vertical"
                className="grid gap-4 p-10 bg-white rounded-lg"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {/* Banner Image */}
                <div className="mb-10">
                    <div className="w-[150px] h-[150px] relative">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <label
                            className="absolute bottom-[10%] cursor-pointer right-[5%] bg-primary rounded-full p-1 text-white"
                            htmlFor="imageUploadBanner"
                        >
                            <CiEdit size={25} />
                        </label>

                        <input
                            id="imageUploadBanner"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>

                <Form.Item
                    label={
                        <label htmlFor="name" className="block text-primaryText mb-1 text-lg font-semibold">
                            Full Name
                        </label>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12 rounded-lg border-none bg-zinc-100" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg font-semibold">
                            Email
                        </label>
                    }
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-12 rounded-lg border-none bg-zinc-100" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="contactNumber" className="block text-primaryText mb-1 text-lg font-semibold">
                            Contact number
                        </label>
                    }
                    name="contactNumber"
                    rules={[{ required: true, message: 'Please input your contact number!' }]}
                >
                    <Input className="h-12 rounded-lg border-none bg-zinc-100" placeholder="+99-01846875456" />
                </Form.Item>

                <Form.Item className="flex">
                    <Button
                        style={{
                            height: 48,
                            padding: '4px 32px',
                            fontSize: 16,
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        Save & Change
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;
