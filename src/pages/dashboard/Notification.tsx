import { Bell } from 'lucide-react';
import {
    useGetAllNotificationQuery,
    useReadAllNotificationMutation,
} from '../../redux/features/notification/notificationApi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect, useRef, useState } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);
import { io } from 'socket.io-client';
import { useGetProfileQuery } from '../../redux/features/profile/profileApi';

const Notification = () => {
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState<any[]>([]);
    const { data: notificationData, isFetching, refetch } = useGetAllNotificationQuery({ query: `?page=${page}` });
    const { data: profileData } = useGetProfileQuery(undefined);

    // infinite scroll
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (notificationData?.data?.data) {
            setNotifications((prev) =>
                page === 1 ? notificationData.data.data : [...prev, ...notificationData.data.data],
            );
        }
    }, [notificationData, page]);

    useEffect(() => {
        if (!observerRef.current) return;
        const handleScroll = () => {
            if (
                observerRef.current &&
                window.innerHeight + window.scrollY >=
                    observerRef.current.offsetTop + observerRef.current.offsetHeight - 100 &&
                !isFetching &&
                notificationData?.pagination?.totalPage > page
            ) {
                setPage((prev) => prev + 1);
            }
        };
        observerRef?.current?.addEventListener('scroll', handleScroll);
        return () => observerRef?.current?.removeEventListener('scroll', handleScroll);
    }, [isFetching, notificationData?.pagination?.totalPage, page]);

    // read notification
    const [readNotification] = useReadAllNotificationMutation();
    const handleReadNotification = async () => {
        try {
            const res = await readNotification({}).unwrap();
            if (res?.success) {
                console.log('Notification read successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        handleReadNotification();
    }, []);

    // handle live notification
    const socket = io(import.meta.env.VITE_SERVER_URL);
    // socket.on('connect', () => {
    //     console.log('Connected to socket');
    // });
    useEffect(() => {
        const eventName = `get-notification::${profileData?.data?._id}`;
        if (!profileData?.data?._id) return;

        const handleNotification = () => {
            refetch();
        };

        socket.on(eventName, handleNotification);

        return () => {
            socket.off(eventName, handleNotification);
        };
    }, [socket]);

    return (
        <div className="p-4">
            <div className="bg-white p-5 rounded-xl">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-primary">Notifications</h1>
                    </div>
                </div>
                <div className="overflow-y-scroll h-[75vh]" ref={observerRef}>
                    {notifications?.map((item: any) => (
                        <div className="w-full p-4 my-2 flex gap-4">
                            <div className="p-3 bg-[#9558B726] text-primary h-fit rounded-full">
                                <Bell />
                            </div>
                            <div className="grid gap-4">
                                <p className={`${item?.isRead ? 'font-medium' : 'font-semibold'} text-[#555555]`}>
                                    {item?.title}
                                </p>
                                <div className="flex items-center gap-5 text-[#A7A7A7]">
                                    <span className="text-xs ">
                                        {dayjs(new Date(item?.createdAt)).format('MMM D, YYYY')}
                                    </span>
                                    <span className="text-xs ">
                                        {dayjs(new Date(item?.createdAt)).format('hh:mm A')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
