import { Button } from 'antd';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { useGetCmsQuery, useUpdateCmsMutation } from '../../../../redux/features/cms/cmsApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const PrivacyPolicy = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [updateContent, { isLoading }] = useUpdateCmsMutation();

    const { data } = useGetCmsQuery({ query: `?type=privacy` });
    const contentData = data?.data;

    // re-set content on mount
    useEffect(() => {
        if (contentData?.content) {
            setContent(contentData?.content);
        }
    }, [contentData?.content]);

    // handle update
    const handleUpdate = async () => {
        toast.loading('Updating...', { id: 'update-privacy' });
        try {
            const res = await updateContent({ payload: { content, type: 'privacy' } }).unwrap();
            if (res?.success) {
                toast.success('Privacy policy updated successfully!', { id: 'update-privacy' });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'update-privacy' });
        }
    };

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Privacy Policy</h1>
            </div>
            <div className="p-6 bg-white rounded-lg">
                <JoditEditor
                    ref={editor}
                    value={content}
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

export default PrivacyPolicy;
