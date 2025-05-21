import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../../redux/features/user/userApi';
import toast from 'react-hot-toast';
import { IMAGE_URL } from '../../../../redux/api/baseApi';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
}

const EditProfile: React.FC = () => {
    const { data } = useGetProfileQuery(undefined);
    const [updateProfile] = useUpdateProfileMutation();
    const [imagePreview, setImagePreview] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const onFinish = async (values: FormValues) => {
        toast.loading('Loading...', {
            id: 'update-profile',
        });

        const formData = new FormData();
        if (file) {
            formData.append('profile', file);
        }
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const res = await updateProfile(formData).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'Profile updated successfully', {
                    id: 'update-profile',
                });
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update profile', {
                id: 'update-profile',
            });
            console.error(error);
        }
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
                initialValues={data?.data}
                onFinish={onFinish}
            >
                {/* Banner Image */}
                <div className="mb-10">
                    <div className="w-[150px] h-[150px] relative">
                        <img
                            src={imagePreview || `${IMAGE_URL}${data?.data?.profile}`}
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
                        <label htmlFor="contact" className="block text-primaryText mb-1 text-lg font-semibold">
                            Contact number
                        </label>
                    }
                    name="contact"
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
