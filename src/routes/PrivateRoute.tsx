import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from '../components/ui/Loader';
import { useGetProfileQuery } from '../redux/features/profile/profileApi';
import { logout } from '../utils/logout';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    // check if access token is available
    const token = Cookies.get('accessToken');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    const { data, isLoading } = useGetProfileQuery(undefined);
    const userRole = data?.data?.role;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    // check if the user is admin or not
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
        return <>{children}</>;
    }

    // denied access to unauthorized users
    logout();
    navigate('/login');
};

export default PrivateRoute;
