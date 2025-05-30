import { ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { useState } from 'react';
import Cookies from 'js-cookie';

const { Sider } = Layout;

export type TSidebarItem = {
    key: string;
    label: string;
    path?: string;
    icon?: React.ReactNode;
    children?: TSidebarItem[];
};

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/login');
    };

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            // collapsables button
            if (item.children) {
                return {
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`,
                        icon: child.icon,
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }

            // logout button
            if (item.path === 'login') {
                return {
                    key: `/${item.path}`,
                    label: (
                        <button onClick={handleLogout} className=" flex items-center justify-start gap-2 w-full">
                            <span> {item.icon} </span>
                            <span> {item.label} </span>
                        </button>
                    ),
                };
            }

            // default buttons
            return {
                key: `/${item.path}`,
                icon: item.icon,
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        itemActiveBg: '#9558B7',
                        itemSelectedColor: '#fff',
                        itemBorderRadius: '0px 30px 30px 0px' as any,
                        itemHeight: 45,
                        itemSelectedBg: '#9558B7',
                    },
                },
            }}
        >
            <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center justify-center pb-10 pt-3 ">
                        <img src={logo} alt="logo" className="w-[60px] h-[60px]" />
                    </div>
                </Link>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    items={sidebarItemsGenerator(sidebarItems)}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
