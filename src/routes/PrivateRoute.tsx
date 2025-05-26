import { useGetProfileQuery } from '../redux/features/profile/profileApi';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    // const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery(undefined);
    const userRole = data?.data?.role;
    console.log(userRole);

    if (isLoading) {
        return <p className="text-center py-8">Loading...</p>;
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
