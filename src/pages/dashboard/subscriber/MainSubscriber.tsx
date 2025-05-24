import ClientSubscriptions from './ClientSubscriptions';
import { ConfigProvider, Tabs } from 'antd';
import AhTistSubscriptions from './AhTistSubsriptions';

const MainSubscriber = () => {
    const tabs = [
        {
            key: '01',
            label: 'Client Subscribers',
            children: <ClientSubscriptions />,
        },
        {
            key: '02',
            label: 'Ah-tist Subscribers',
            children: <AhTistSubscriptions />,
        },
    ];

    return (
        <section className="grid gap-4 p-5 rounded-lg">
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
                        colorBorder: 'red',
                    },
                }}
            >
                <Tabs type="card" items={tabs} />
            </ConfigProvider>
        </section>
    );
};

export default MainSubscriber;
