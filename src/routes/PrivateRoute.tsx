import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from '../components/ui/Loader';
import { useGetProfileQuery } from '../redux/features/profile/profileApi';
import { logout } from '../utils/logout';
import sidebarItems from '../utils/sidebarItems';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname.split('/')[1];

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
    if (!(userRole === 'ADMIN' || userRole === 'SUPER_ADMIN')) {
        logout();
        navigate('/login');
        return;
    }

    const universalRoutes = ['profile', 'change-password'];

    // role based access control
    const userPermissions = data?.data?.permissions;
    const allowedRoutes = sidebarItems.filter((item) => userPermissions?.includes(item.label)).map((item) => item.path);
    console.log(pathname);

    if (!allowedRoutes.includes(pathname) && !universalRoutes.includes(pathname) && userRole !== 'SUPER_ADMIN') {
        return (
            <h1 className="text-2xl font-semibold text-center my-12">
                You are not authorized to access this page <br /> Please contact admin or site owner.
            </h1>
        );
    }

    // allow access to the user
    return <>{children}</>;
};

export default PrivateRoute;
