import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/analytics/Dashboard';
import MakeAdmin from '../pages/dashboard/MakeAdmin';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import Brands from '../pages/dashboard/Brands';
import Services from '../pages/dashboard/services/Services';
import Review from '../pages/dashboard/Review';
import Campaign from '../pages/dashboard/Campaign';
import TermsCondition from '../pages/dashboard/TermsCondition';
import FAQs from '../pages/dashboard/FAQs';
import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import ResetPassword from '../pages/authentication/ResetPassword';
import Profile from '../pages/dashboard/settings/profile/Profile';
import Clients from '../pages/dashboard/users/Clients';
import Artist from '../pages/dashboard/users/Artist';
import UserDetails from '../pages/dashboard/users/UserDetails';
import BookingsPage from '../pages/dashboard/booking/Booking';
import BookingDetailsPage from '../pages/dashboard/booking/BookingDetails';
import PaymentPage from '../pages/dashboard/payment/Payment';
import PaymentDetailsPage from '../pages/dashboard/payment/PaymentDetails';
import ChangePassword from '../pages/dashboard/settings/ChangePassword';
import EditProfile from '../pages/dashboard/settings/profile/EditProfile';
import AboutUs from '../pages/dashboard/settings/about/AboutUs';
import PrivacyPolicy from '../pages/dashboard/settings/privacyPolicy/PrivacyPolicy';
import TermsOfService from '../pages/dashboard/settings/termsOfService/TermsOfService';
import Faq from '../pages/dashboard/settings/faq/Faq';
import ManageAdmin from '../pages/dashboard/manageAdmin/ManageAdmin';
import BonusAndChallanges from '../pages/dashboard/bonusAndChallenges/BonusAndChallages';
import ReferralPage from '../pages/dashboard/referral/Referral';
import SubscriptionPlans from '../pages/dashboard/subscriptionPlans/SubscriptionPlans';
import MainSubscriber from '../pages/dashboard/subscriber/MainSubscriber';
import ClientAgreement from '../pages/dashboard/agreement/client/ClientAgreement';
import ClientResponsibility from '../pages/dashboard/agreement/client/ClientResponsibility';
import AhTistResponsibility from '../pages/dashboard/agreement/ahTist/AhTistResponsibility';
import AhTistAgreement from '../pages/dashboard/agreement/ahTist/AhTistAgreement';

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
            { path: 'subscription-plan', element: <SubscriptionPlans /> },
            { path: 'services', element: <Services /> },
            { path: 'bookings', element: <BookingsPage /> },
            { path: 'bookings/:id', element: <BookingDetailsPage /> },
            { path: 'payments', element: <PaymentPage /> },
            { path: 'payments/:id', element: <PaymentDetailsPage /> },
            { path: 'settings/change-password', element: <ChangePassword /> },
            { path: 'settings/profile', element: <Profile /> },
            { path: 'settings/profile/edit-profile', element: <EditProfile /> },
            { path: 'settings/about-us', element: <AboutUs /> },
            { path: 'settings/privacy-policy', element: <PrivacyPolicy /> },
            { path: 'settings/terms-of-service', element: <TermsOfService /> },
            { path: 'settings/faq', element: <Faq /> },
            { path: 'agreement/client-agreement', element: <ClientAgreement /> },
            { path: 'agreement/client-responsibility', element: <ClientResponsibility /> },
            { path: 'agreement/ah-tist-agreement', element: <AhTistAgreement /> },
            { path: 'agreement/ah-tist-responsibility', element: <AhTistResponsibility /> },
            { path: 'manage-admin', element: <ManageAdmin /> },
            { path: 'bonus-and-challenges', element: <BonusAndChallanges /> },
            { path: 'referral', element: <ReferralPage /> },
            { path: 'notification', element: <Notification /> },
            { path: 'reviews', element: <Review /> },
            { path: 'campaign', element: <Campaign /> },
            { path: 'make-admin', element: <MakeAdmin /> },
            { path: 'terms', element: <TermsCondition /> },
            { path: 'faqs', element: <FAQs /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/reset-password', element: <ResetPassword /> },
]);

export default router;
