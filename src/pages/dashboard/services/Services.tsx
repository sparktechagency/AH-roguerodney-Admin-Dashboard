import { ConfigProvider, Tabs } from 'antd';
import CategoryTable from './CategoryTable';

const Services = () => {
    const tabs = [
        {
            key: '01',
            label: 'Category',
            children: <CategoryTable />,
        },
    ];

    return (
        <div className="bg-white p-5 m-4 rounded-lg h-full">
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemSelectedColor: 'white',
                            titleFontSize: 18,
                            cardGutter: 12,
                        },
                    },
                    token: {
                        borderRadius: 20,
                    },
                }}
            >
                <Tabs type="card" items={tabs} />
            </ConfigProvider>
        </div>
    );
};

export default Services;
