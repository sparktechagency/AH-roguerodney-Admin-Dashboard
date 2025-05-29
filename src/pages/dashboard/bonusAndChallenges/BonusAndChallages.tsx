import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import BonusAndChallangesTable from './BonusAndChallangesTable';
import MyModal from '../../../components/shared/MyModal';
import AddChallengeForm from './forms/AddChallengeForm';

const BonusAndChallanges = () => {
    const [addChallengeModal, setAddChallengeModal] = useState(false);

    return (
        <div className="grid gap-6 p-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Ah-tist Bonus & Challenge System</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setAddChallengeModal(true)}>
                    <Plus size={20} /> Add Challenge
                </Button>
            </div>
            <BonusAndChallangesTable />

            {/* add modal */}
            <MyModal open={addChallengeModal} setOpen={setAddChallengeModal} width={500}>
                <AddChallengeForm setModalOpen={setAddChallengeModal} />
            </MyModal>
        </div>
    );
};

export default BonusAndChallanges;
