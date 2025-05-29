import { Button } from 'antd';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { useGetCmsQuery, useUpdateCmsMutation } from '../../../../redux/features/cms/cmsApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Loader from '../../../../components/ui/Loader';

const TermsOfService = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [updateContent, { isLoading: isPending }] = useUpdateCmsMutation();

    const { data, isLoading } = useGetCmsQuery({ query: `?type=terms` });
    const contentData = data?.data;

    // re-set content on mount
    useEffect(() => {
        if (contentData?.content) {
            setContent(contentData?.content);
        }
    }, [contentData?.content]);

    // handle update
    const handleUpdate = async () => {
        toast.loading('Updating...', { id: 'update-terms' });
        try {
            const res = await updateContent({ payload: { content, type: 'terms' } }).unwrap();
            if (res?.success) {
                toast.success('Terms updated successfully!', { id: 'update-terms' });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'update-terms' });
        }
    };

    // show loader
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader />
            </div>
        );
    }

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Terms of Service</h1>
            </div>
            <div className="p-6 bg-white rounded-lg">
                <JoditEditor
                    ref={editor}
                    value={content}
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

export default TermsOfService;
