import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from '../components/ui/Loader';
import { useGetProfileQuery } from '../redux/features/profile/profileApi';
import { logout } from '../utils/logout';
import sidebarItems from '../utils/sidebarItems';
import UnauthorizedPage from '../pages/authentication/UnauthorizedPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname.split('/')[1];
    const fullPath = window.location.pathname;
    console.log('pathname', pathname);

    // check if access token is available
    const token = Cookies.get('accessToken');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    // load profile data and show loader while fetching data
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

    // allow for universal routes
    const universalRoutes = ['/profile', '/profile/edit-profile', '/profile/change-password', '/notification'];
    if (universalRoutes.includes(fullPath)) {
        return <>{children}</>;
    }

    // role based access control
    const userPermissions = data?.data?.permissions;
    const allowedRoutes = sidebarItems.filter((item) => userPermissions?.includes(item.label)).map((item) => item.path);

    if (userRole !== 'SUPER_ADMIN') {
        // allow everything for super admin
        if (!allowedRoutes.includes(pathname)) {
            return <UnauthorizedPage />;
        }
    }

    // finally allow access to the user
    return <>{children}</>;
};

export default PrivateRoute;
