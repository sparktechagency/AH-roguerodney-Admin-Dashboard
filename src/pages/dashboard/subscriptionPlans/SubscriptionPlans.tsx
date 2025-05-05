import { ConfigProvider, Tabs } from 'antd';
import ClientSubscriptions from './ClientSubscriptions';
import AhTistSusbscriptions from './AhTistSusbscriptions';

const SubscriptionPlans = () => {
    const tabs = [
        {
            key: '01',
            label: 'Client Subscription',
            children: <ClientSubscriptions />,
        },
        {
            key: '02',
            label: 'Ah-tist Subscription',
            children: <AhTistSusbscriptions />,
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
                            // cardBg: 'red'
                        },
                    },
                    token: {
                        // colorBgContainer: '#9558B7',
                        // fontSize:
                        borderRadius: 20,
                    },
                }}
            >
                <Tabs type="card" items={tabs} />
            </ConfigProvider>
        </div>
    );
};

export default SubscriptionPlans;
