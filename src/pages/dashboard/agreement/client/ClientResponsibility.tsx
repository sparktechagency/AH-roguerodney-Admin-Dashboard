import { Button } from 'antd';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { useGetAgreementQuery, useUpdateAgreementMutation } from '../../../../redux/features/agreement/agreementApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Loader from '../../../../components/ui/Loader';

const ClientResponsibility = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [updateContent, { isLoading: isPending }] = useUpdateAgreementMutation();
    const { data, isLoading } = useGetAgreementQuery({ query: `?type=responsibility&for=user` });
    const contentData = data?.data;

    // re-set content on mount
    useEffect(() => {
        if (contentData?.content) {
            setContent(contentData?.content);
        }
    }, [contentData?.content]);

    // handle update
    const handleUpdate = async () => {
        toast.loading('Updating...', { id: 'update-client-responsibility' });
        try {
            const res = await updateContent({
                payload: { content, type: 'responsibility', for: 'user' },
            }).unwrap();
            if (res?.success) {
                toast.success('Responsibility updated successfully!', { id: 'update-client-responsibility' });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'update-client-responsibility' });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader />
            </div>
        );
    }

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Client Responsibility</h1>
            </div>
            <div className="p-6 bg-white rounded-lg">
                <JoditEditor
                    ref={editor}
                    value={contentData?.content}
                    config={{ height: 550, theme: 'light', readonly: false }}
                    onBlur={(newContent) => setContent(newContent)}
                />
                <Button onClick={handleUpdate} type="primary" className="mt-6 text-base p-6 px-12">
                    {isPending ? <Loader2 className="animate-spin" /> : 'Save'}
                </Button>
            </div>
        </section>
    );
};

export default ClientResponsibility;
