import { ConfigProvider, Tabs } from 'antd';
import GeneralReview from './GeneralReview';
import CategoryReview from './CategoryReview';

const Reviews = () => {
    const tabs = [
        {
            key: '01',
            label: 'General Review',
            children: <GeneralReview />,
        },
        {
            key: '02',
            label: 'Category Review',
            children: <CategoryReview />,
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

export default Reviews;
