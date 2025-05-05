import { Button } from 'antd';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

const ClientAgreement = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Client Agreement</h1>
            </div>
            <div className="p-6 bg-white rounded-lg">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={{ height: 550, theme: 'light', readonly: false }}
                    onBlur={(newContent) => setContent(newContent)}
                />
                <Button type="primary" className="mt-6 text-base p-6 px-12">
                    Save
                </Button>
            </div>
        </section>
    );
};

export default ClientAgreement;
