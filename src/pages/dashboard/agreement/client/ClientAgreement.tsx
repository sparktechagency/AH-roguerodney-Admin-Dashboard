import { Button } from 'antd';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { useGetAgreementQuery, useUpdateAgreementMutation } from '../../../../redux/features/agreement/agreementApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const ClientAgreement = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [updateContent, { isLoading }] = useUpdateAgreementMutation();

    const { data } = useGetAgreementQuery({ query: `?type=agreement&for=user` });
    const contentData = data?.data;

    // handle update
    const handleUpdate = async () => {
        toast.loading('Updating...', { id: 'update-client-agreement' });
        try {
            const res = await updateContent({ payload: { content, type: 'agreement', for: 'user' } }).unwrap();
            if (res?.success) {
                toast.success('Agreement updated successfully!', { id: 'update-client-agreement' });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'update-client-agreement' });
        }
    };

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Client Agreement</h1>
            </div>
            <div className="p-6 bg-white rounded-lg">
                <JoditEditor
                    ref={editor}
                    value={contentData?.content}
                    config={{ height: 550, theme: 'light', readonly: false }}
                    onBlur={(newContent) => setContent(newContent)}
                />
                <Button onClick={handleUpdate} type="primary" className="mt-6 text-base p-6 px-12">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Save'}
                </Button>
            </div>
        </section>
    );
};

export default ClientAgreement;
