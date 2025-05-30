import Loader from '../components/ui/Loader';
import { useGetProfileQuery } from '../redux/features/profile/profileApi';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    // const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery(undefined);
    const userRole = data?.data?.role;
    console.log(userRole);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;

    // verify if the user is admin or not
    // if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
    //     return <>{children}</>;
    // }

    // toast.error('You are not authorized to access this page');
    // logout();
    // navigate('/login');
};

export default PrivateRoute;
