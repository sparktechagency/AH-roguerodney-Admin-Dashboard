import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/analytics/Dashboard';
import MakeAdmin from '../pages/dashboard/MakeAdmin';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import Brands from '../pages/dashboard/Brands';
import Services from '../pages/dashboard/Services';
import Review from '../pages/dashboard/Review';
import Campaign from '../pages/dashboard/Campaign';
import TermsCondition from '../pages/dashboard/TermsCondition';
import FAQs from '../pages/dashboard/FAQs';
import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Profile from '../pages/dashboard/profile/Profile';
import Clients from '../pages/dashboard/users/Clients';
import Artist from '../pages/dashboard/users/Artist';
import UserDetails from '../pages/dashboard/users/UserDetails';
import MainSubscriber from '../pages/dashboard/subscriber/MainSubscriber';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users/clients', element: <Clients /> },
            { path: 'users/artist', element: <Artist /> },
            { path: 'user-details', element: <UserDetails /> },
            { path: 'brands', element: <Brands /> },
            { path: 'subscriber', element: <MainSubscriber /> },
            { path: 'services', element: <Services /> },
            { path: 'reviews', element: <Review /> },
            { path: 'campaign', element: <Campaign /> },
            { path: 'make-admin', element: <MakeAdmin /> },
            { path: 'terms', element: <TermsCondition /> },
            { path: 'faqs', element: <FAQs /> },
            { path: 'notification', element: <Notification /> },
            { path: 'profile', element: <Profile /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
