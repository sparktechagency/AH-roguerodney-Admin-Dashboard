import { Bell } from 'lucide-react';
const Notification = () => {
    return (
        <div className="p-4">
            <div className="bg-white p-5 rounded-xl">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-primary">Notifications</h1>
                    </div>
                    {/* <div className="flex items-center gap-4">
                        <Button
                            type="primary"
                            style={{
                                height: '40px',
                            }}
                        >
                            <span>Read all</span>
                        </Button>
                    </div> */}
                </div>
                <div>
                    {[1, 1, 1, 1, 1].map((_item: any, index: number) => {
                        return (
                            <div key={index} className="w-full p-4 my-2 flex gap-4">
                                <div className="p-3 bg-[#9558B726] text-primary h-fit rounded-full">
                                    <Bell />
                                </div>
                                <div className="grid gap-4">
                                    <p className="font-semibold text-[#555555]">
                                        Unlock beauty at your doorstep today!
                                    </p>
                                    <div className="flex items-center gap-5 text-[#A7A7A7]">
                                        <span className="text-xs ">04-06-2024</span>
                                        <span className="text-xs ">10:00 AM</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Notification;
