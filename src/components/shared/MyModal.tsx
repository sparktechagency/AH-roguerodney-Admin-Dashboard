import { Modal } from 'antd';

// Modal built by Rahad Ullah

interface IModalProps {
    children: React.ReactElement;
    open: boolean;
    setOpen: (open: boolean) => void;
    width?: number;
}

const MyModal = ({ children, open, setOpen, width }: IModalProps) => {
    return (
        <>
            <Modal centered footer={false} open={open} onCancel={() => setOpen(false)} width={width || 400}>
                {children}
            </Modal>
        </>
    );
};

export default MyModal;
