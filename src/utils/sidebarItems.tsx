import { BiCategory } from 'react-icons/bi';
import { TbUserDollar } from 'react-icons/tb';
import {
    BookUser,
    CalendarRange,
    ChartPie,
    CircleDollarSignIcon,
    Contact,
    FileCheck,
    FileUser,
    Gem,
    Gift,
    Handshake,
    Info,
    LockKeyhole,
    LogOut,
    MessageCircleQuestion,
    Settings,
    ShieldCheck,
    ShieldUser,
    UserRound,
    Users,
    WalletMinimal,
} from 'lucide-react';
type TSidebarItem = {
    key: string;
    label: string;
    path?: string;
    icon?: React.ReactNode;
    children?: TSidebarItem[];
};

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
        icon: <Settings size={24} />,
        children: [
            {
                key: 'change-password',
                label: 'Change Password',
                path: 'settings/change-password',
                icon: <LockKeyhole size={20} />,
            },
            {
                key: 'profile',
                label: 'Profile',
                path: 'settings/profile',
                icon: <UserRound size={20} />,
            },
            {
                key: 'about-us',
                label: 'About Us',
                path: 'settings/about-us',
                icon: <Info size={20} />,
            },
            {
                key: 'privacy-policy',
                label: 'Privacy Policy',
                path: 'settings/privacy-policy',
                icon: <ShieldCheck size={20} />,
            },
            {
                key: 'terms-of-service',
                label: 'Terms of Service',
                path: 'settings/terms-of-service',
                icon: <FileCheck size={20} />,
            },
            {
                key: 'faq',
                label: 'FAQ',
                path: 'settings/faq',
                icon: <MessageCircleQuestion size={20} />,
            },
        ],
    },
    {
        key: 'agreement',
        label: 'Agreement',
        path: 'agreement',
        icon: <Handshake size={24} />,
        children: [
            {
                key: 'client-agreement',
                label: 'Client Agreement',
                path: 'agreement/client-agreement',
                icon: <FileUser size={20} />,
            },
            {
                key: 'client-responsibility',
                label: 'Client Responsibility',
                path: 'agreement/client-responsibility',
                icon: <BookUser size={20} />,
            },
            {
                key: 'ah-tist-agreement',
                label: 'Ah-tist Agreement',
                path: 'agreement/ah-tist-agreement',
                icon: <FileUser size={20} />,
            },
            {
                key: 'ah-tist-responsibility',
                label: 'Ah-tist Responsibility',
                path: 'agreement/ah-tist-responsibility',
                icon: <BookUser size={20} />,
            },
        ],
    },
    {
        key: 'manage-admin',
        label: 'Manage Admin',
        path: 'manage-admin',
        icon: <ShieldUser size={24} />,
    },
    {
        key: 'bonus-and-challenges',
        label: 'Bonus & Challenges',
        path: 'bonus-and-challenges',
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
