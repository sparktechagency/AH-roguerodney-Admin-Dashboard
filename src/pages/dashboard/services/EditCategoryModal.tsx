import { Modal } from 'antd';

const EditCategoryModal = ({
    open,
    setOpen,
    children,
    setEditCategoryData,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactNode;
    setEditCategoryData: (data: any) => void;
}) => {
    return (
        <Modal
            open={open}
            onCancel={() => {
                setOpen(false);
                setEditCategoryData(null);
            }}
            title="Edit Category"
            footer={null}
        >
            {children}
        </Modal>
    );
};

export default EditCategoryModal;
