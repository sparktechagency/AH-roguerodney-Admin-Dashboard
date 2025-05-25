import React from 'react';
import { Modal as AntModal } from 'antd';

interface IModalProps {
    title?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    width?: number;
    action?: () => any;
}

const DeleteModal: React.FC<IModalProps> = ({ title, open, setOpen, width, action }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AntModal centered footer={false} open={open} onCancel={handleClose} width={width || 400}>
            <div className="flex flex-col justify-center gap-4">
                <h1 className="text-xl font-semibold">{title || 'Are you sure to delete?'}</h1>
                <p>This action will parmanently delete the data from our server.</p>
                <div className="flex justify-end gap-2">
                    <button className="bg-primary text-white px-6 py-2 rounded-full" onClick={handleClose}>
                        Cancel
                    </button>
                    <button onClick={action} className="bg-red-500 text-white px-6 py-2 rounded-full">
                        Delete
                    </button>
                </div>
            </div>
        </AntModal>
    );
};

export default DeleteModal;
