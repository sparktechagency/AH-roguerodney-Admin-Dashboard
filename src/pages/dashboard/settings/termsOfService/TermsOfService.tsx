import { Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

const TermsOfService = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Terms of Service</h1>
                {/* Dropdown Filter */}
                <Select defaultValue="All" className="w-40 h-[42px]">
                    <Option value="All">All</Option>
                    <Option value="Client Agreement">Client Agreement</Option>
                    <Option value="Client Responsibility">Client Responsibility</Option>
                    <Option value="Ah-tist Agreement">Ah-tist Agreement</Option>
                    <Option value="Ah-tist Responsibility">Ah-tist Responsibility</Option>
                </Select>
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

export default TermsOfService;
