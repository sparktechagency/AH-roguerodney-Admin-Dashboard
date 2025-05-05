import { ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { useState } from 'react';

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

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`, // Match with location.pathname
                        icon: child.icon,
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }

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
