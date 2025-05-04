

import { ConfigProvider, Layout, Menu, MenuProps } from 'antd';
// import { sidebarItemsGenerator } from '../../utils/generateSidebarItems'; 
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom'; 
import logo from "../../assets/logo.jpg"

const { Sider } = Layout; 

export type TSidebarItem = {
    key: string;
    label: string;
    path?: string;
    icon?: React.ReactNode;
    children?: TSidebarItem[];
  }; 

const Sidebar = () => { 

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map(item => {
          if (item.children) {
            return {
              key: item.key,
              icon: item.icon,
              label: item.label,
              children: item.children.map(child => ({
                key: child.key,
                icon: child.icon,
                label: <Link to={`/${child.path}`}>{child.label}</Link>,
              })),
            };
          }
      
          return {
            key: item.key,
            icon: item.icon,
            label: <Link to={`/${item.path}`}>{item.label}</Link>,
          };
        });
      }; 

    return (
        <ConfigProvider
            theme={{
                token: {
                    // colorPrimary: '#DAA520',
                    // colorBgContainer: '#DAA520',
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        // itemBg: '#DAA520',
                        itemActiveBg: '#9558B7',
                        itemSelectedColor: '#fff',
                        itemBorderRadius: '0px 30px 30px 0px' as any,
                        itemHeight: 45,

                        itemSelectedBg: '#9558B7',
                        // colorItemBgActive: '#DAA520',
                        // colorPrimaryActive: '#DAA520',
                        // colorBgBase: '#DAA520',
                    },
                },
            }}
        >
            <Sider
                width={250}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"

                // onBreakpoint={(broken) => {
                //   // console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //   console.log(collapsed, type);
                // }}
            >
                {/* logo of the website */}
                <Link to="/">
                    <div
                        className="flex items-center justify-center pb-10 pt-3 "
                    >
                    <img src={logo} alt="" className="w-[60px] h-[60px]" />
                    </div>
                </Link>

             <Menu
  theme="light"
  mode="inline"
//   defaultOpenKeys={['users']}
  defaultSelectedKeys={['analytics']}
  items={sidebarItemsGenerator(sidebarItems)}
/>
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
