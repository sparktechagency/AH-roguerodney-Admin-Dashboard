import { Button } from 'antd';
import { logout } from '../../utils/logout';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-2xl font-semibold text-center my-12">
                You are not authorized to access this page <br /> Please contact admin or site owner.
            </h1>
            <div className="flex items-center justify-center gap-4">
                <Button
                    type="primary"
                    className="bg-red-500 hover:bg-red-700 text-base"
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                >
                    Logout
                </Button>
                <Button
                    type="primary"
                    className="text-base"
                    onClick={() => {
                        navigate('/profile');
                    }}
                >
                    Go Profile
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
