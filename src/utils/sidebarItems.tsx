import { BiCategory } from 'react-icons/bi';
import { TSidebarItem } from './generateSidebarItems';
import { TbUserDollar } from 'react-icons/tb';
import {
    CalendarRange,
    ChartPie,
    CircleDollarSignIcon,
    Contact,
    Gem,
    Gift,
    LogOut,
    Settings,
    ShieldUser,
    Users,
    WalletMinimal,
} from 'lucide-react';
const sidebarItems: TSidebarItem[] = [
    {
        key: 'analytics',
        label: 'Analytics',
        path: '',
        icon: <ChartPie size={24} />,
    },
    {
        key: 'users',
        label: 'Users',
        icon: <Users size={24} />,
        children: [
            {
                key: 'clients',
                label: 'Clients',
                path: 'users/clients',
                icon: <Users size={20} />,
            },
            {
                key: 'artist',
                label: 'Artist',
                path: 'users/artist',
                icon: <Contact size={20} />,
            },
        ],
    },
    {
        key: 'subscription-plan',
        label: 'Subscription Plan',
        path: 'subscription-plan',
        icon: <WalletMinimal size={24} />,
    },
    {
        key: 'subscriber',
        label: 'Subscriber',
        path: 'subscriber',
        icon: <TbUserDollar size={24} />,
    },
    {
        key: 'services',
        label: 'Services',
        path: 'services',
        icon: <BiCategory size={24} />,
    },
    {
        key: 'bookings',
        label: 'Bookings',
        path: 'bookings',
        icon: <CalendarRange size={24} />,
    },
    {
        key: 'payments',
        label: 'Payments',
        path: 'payments',
        icon: <CircleDollarSignIcon size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <Settings size={24} />,
    },
    {
        key: 'manage-admin',
        label: 'Manage Admin',
        path: 'manage-admin',
        icon: <ShieldUser size={24} />,
    },
    {
        key: 'bonus',
        label: 'Bonus & Challenges',
        path: 'bonus',
        icon: <Gift size={24} />,
    },
    {
        key: 'referral',
        label: 'Referral',
        path: 'referral',
        icon: <Gem size={24} />,
    },
    {
        key: 'logout',
        label: 'Log Out',
        path: 'login',
        icon: <LogOut size={24} />,
    },
];

export default sidebarItems;
