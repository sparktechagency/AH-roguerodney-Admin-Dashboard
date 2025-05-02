import { Table, Avatar } from 'antd';
const UserDetails = () => { 
    const data = [
        {
          key: '1',
          no: '#2472',
          artist: { name: 'Candice', email: 'candice@gmail.com' },
          provider: { name: 'Candice', email: 'candice@gmail.com' },
          location: '3891 Ranchview',
          price: '$130',
          category: 'Hair',
          time: '2/11/12; 02:00PM',
        },
        {
          key: '2',
          no: '#2450',
          artist: { name: 'Candice', email: 'candice@gmail.com' },
          provider: { name: 'Candice', email: 'candice@gmail.com' },
          location: '3891 Ranchview',
          price: '$130',
          category: 'Makeup',
          time: '2/11/12; 02:00PM',
        },
        {
          key: '3',
          no: '#2450',
          artist: { name: 'Candice', email: 'candice@gmail.com' },
          provider: { name: 'Candice', email: 'candice@gmail.com' },
          location: '3891 Ranchview',
          price: '$130',
          category: 'Hair',
          time: '2/11/12; 02:00PM',
        },
    
      ];
      
      const renderUser = ({ name, email }:{ name: string; email: string }) => (
        <div className="flex items-center gap-2">
          <Avatar size="small" src="https://i.pravatar.cc/100" />
          <div>
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
        </div>
      );
      
      const columns = [
        {
          title: 'S. no.',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Artist',
          dataIndex: 'artist',
          key: 'artist',
          render: renderUser,
        },
        {
          title: 'Provider',
          dataIndex: 'provider',
          key: 'provider',
          render: renderUser,
        },
        {
          title: 'Service location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'Appt. time',
          dataIndex: 'time',
          key: 'time',
        },
      ];
    return (
        <div>
                <div className="p-6 rounded-xl shadow-md bg-white  mx-auto ">
      <h2 className="text-center text-[28px] font-bold text-primary mb-4">Client info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[46px]">
        {/* Client Info Card */}
        <div className="border rounded-xl p-5 ">
 
          <div> 
            <div className="flex justify-start items-center gap-3 "> 
            <img
            src="/user.svg"
            alt="Client"
            className="w-[114px] h-[114px] rounded-full object-cover mt-1"
          /> 

          <div> 
          <h3 className="text-xl  font-normal text-primary pb-1">Candice</h3>
            <p className="text-[16px] text-[#929292] ">candice@gmail.com</p>
          </div>
            </div>
           
            <div className="text-sm space-y-3 pt-3">
              <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Contact :</span> <span> 01867412400 </span>  </p>
              <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Location :</span> <span> 3891 Ranchview </span> </p>
              <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Joining Date :</span>  <span>  2/11/12</span></p>
              <div className="flex items-center justify-between text-[16px]">
                <p className="font-medium">Status:</p>  
                <select className="text-sm border rounded px-2 py-1"> 
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Subscription Plan : </span>  <span> Ah Casual </span></p>
            </div>
          </div>
        </div>

        {/* Subscription Plan Card */}
        <div className="border rounded-xl p-5">
          <h3 className="text-xl font-semibold text-primary mb-4">Subscription Plan</h3>

          <div className="text-sm space-y-3">
            <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Package Name :</span> <span> Ah Casual</span></p>
            <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Package Validity :</span>  <span> 1 month</span></p>
            <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Price :</span>  <span> Free </span> </p>
            <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">Start Date :</span> <span> 05/10/2025</span></p>
            <p className=" flex items-center justify-between text-[16px]"><span className="font-medium">End Date :</span> <span> 05/12/2025</span> </p>
            <p className="flex items-center justify-between text-[16px]">
              <span className="font-medium">Status :</span> 
              <select className="text-sm border rounded px-2 py-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </p>
          </div>
        </div>
      </div>  

      <div className='mt-8'> 
      <Table columns={columns} dataSource={data} />
      </div>
    </div> 
        </div>
    );
};

export default UserDetails;