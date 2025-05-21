import toast from 'react-hot-toast';
import { useGetProfileQuery } from '../redux/features/user/userApi';
import { logout } from '../utils/logout';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { data } = useGetProfileQuery(undefined);
    const userRole = data?.data?.role;

    // verify if the user is admin or not
    if ((userRole && userRole === 'ADMIN') || userRole === 'SUPER_ADMIN') {
        return <>{children}</>;
    }

    toast.error('You are not authorized to access this page');
    logout();
    navigate('/login');
};

export default PrivateRoute;
