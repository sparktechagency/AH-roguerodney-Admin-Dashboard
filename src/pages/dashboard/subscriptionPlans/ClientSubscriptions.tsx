import { Loader2, PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
import { useGetAllPlansQuery } from '../../../redux/features/plan/planApi';
import EditPlanForm from './forms/EditPlanForm';

const ClientSubscriptions = () => {
    const [editPlanModal, setEditPlanModal] = useState(false);
    const [editModalData, setEditModalData] = useState<
        { name?: string; price?: number; title?: string; price_offer?: number; offers?: string[] } | undefined
    >(undefined);

    const { data, isLoading } = useGetAllPlansQuery({ query: `for=USER` });
    const package1 = data?.data[0];
    const package2 = data?.data[1];
    const package3 = data?.data[2];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin" />
            </div>
        );
    }

    return (
        <section className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
                {/* Ah Casual  */}
                {package1 && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-teal-400 text-white rounded-2xl">
                            <h3 className="text-2xl font-medium">{package1?.name}</h3>
                            <button
                                onClick={() => {
                                    setEditPlanModal(true);
                                    setEditModalData(package1);
                                }}
                            >
                                <PencilLineIcon />
                            </button>
                        </div>
                        <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                            <h4 className="text-lg text-teal-400 font-semibold">{package1?.title}</h4>
                            <ul className="list-disc pl-6 grid gap-2 text-base">
                                {package1?.offers?.map((item: any, idx: number) => (
                                    <li key={idx} className="font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Ah Glow  */}
                {package2 && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#6A3E82] text-white rounded-2xl">
                            <h3 className="text-2xl font-medium">{package2?.name}</h3>
                            <button
                                onClick={() => {
                                    setEditPlanModal(true);
                                    setEditModalData(package2);
                                }}
                            >
                                <PencilLineIcon />
                            </button>
                        </div>
                        <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                            <h4 className="text-lg text-[#6A3E82] font-semibold">{package2?.title}</h4>
                            <ul className="list-disc pl-6 grid gap-2 text-base">
                                {package2?.offers?.map((item: any, idx: number) => (
                                    <li key={idx} className="font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Ah Luxe  */}
                {package3 && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#2190F2] text-white rounded-2xl">
                            <h3 className="text-2xl font-medium">{package3?.name}</h3>
                            <button
                                onClick={() => {
                                    setEditPlanModal(true);
                                    setEditModalData(package3);
                                }}
                            >
                                <PencilLineIcon />
                            </button>
                        </div>
                        <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                            <h4 className="text-lg text-[#2190F2] font-semibold">{package3?.title}</h4>
                            <ul className="list-disc pl-6 grid gap-2 text-base">
                                {package3?.offers?.map((item: any, idx: number) => (
                                    <li key={idx} className="font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <EditPlanForm
                    defaultData={editModalData}
                    open={editPlanModal}
                    setOpen={setEditPlanModal}
                    setEditModalData={setEditModalData}
                />
            </div>
        </section>
    );
};

export default ClientSubscriptions;
