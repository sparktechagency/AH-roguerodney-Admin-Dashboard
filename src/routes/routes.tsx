import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/analytics/Dashboard';
import MakeAdmin from '../pages/dashboard/MakeAdmin';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import Services from '../pages/dashboard/services/Services';
import TermsCondition from '../pages/dashboard/TermsCondition';
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
import PrivateRoute from './PrivateRoute';
import ReportPage from '../pages/dashboard/report/Report';
import ReportDetailsPage from '../pages/dashboard/report/ReportDetails';
import SupportPage from '../pages/dashboard/support/Support';
import Reviews from '../pages/dashboard/review/Review';
import Payout from '../pages/dashboard/settings/payout/Payout';
import DeleteAccount from '../pages/public/DeleteAccount';
import ReadPrivacyPolicy from '../pages/public/PrivacyPolicy';
import ReadTermsAndConditions from '../pages/public/TermsAndConditions';
import PaymentSuccess from '../pages/public/PaymentSuccess';
import PaymentFail from '../pages/public/PaymentFail';
import AccountCreateSuccess from '../pages/public/AccountCreateSuccessful';
import AccountCreateFail from '../pages/public/AccountCreateFail';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users/clients', element: <Clients /> },
            { path: 'users/artist', element: <Artist /> },
            { path: 'user-details/:id', element: <UserDetails /> },
            { path: 'subscriber', element: <MainSubscriber /> },
            { path: 'subscription-plan', element: <SubscriptionPlans /> },
            { path: 'services', element: <Services /> },
            { path: 'bookings', element: <BookingsPage /> },
            { path: 'bookings/:id', element: <BookingDetailsPage /> },
            { path: 'payments', element: <PaymentPage /> },
            { path: 'reports', element: <ReportPage /> },
            { path: 'reports/:id', element: <ReportDetailsPage /> },
            { path: 'supports', element: <SupportPage /> },
            { path: 'profile', element: <Profile /> },
            { path: 'profile/edit-profile', element: <EditProfile /> },
            { path: 'profile/change-password', element: <ChangePassword /> },
            { path: 'settings/about-us', element: <AboutUs /> },
            { path: 'settings/payout', element: <Payout /> },
            { path: 'settings/privacy-policy', element: <PrivacyPolicy /> },
            { path: 'settings/terms-of-service', element: <TermsOfService /> },
            { path: 'settings/faq', element: <Faq /> },
            { path: 'settings/review', element: <Reviews /> },
            { path: 'agreement/client-agreement', element: <ClientAgreement /> },
            { path: 'agreement/client-responsibility', element: <ClientResponsibility /> },
            { path: 'agreement/ah-tist-agreement', element: <AhTistAgreement /> },
            { path: 'agreement/ah-tist-responsibility', element: <AhTistResponsibility /> },
            { path: 'manage-admin', element: <ManageAdmin /> },
            { path: 'bonus-and-challenges', element: <BonusAndChallanges /> },
            { path: 'referral', element: <ReferralPage /> },
            { path: 'notification', element: <Notification /> },
            { path: 'make-admin', element: <MakeAdmin /> },
            { path: 'terms', element: <TermsCondition /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/delete-account', element: <DeleteAccount /> },
    { path: '/privacy-policy', element: <ReadPrivacyPolicy /> },
    { path: '/terms-and-conditions', element: <ReadTermsAndConditions /> },
    { path: '/payment-success', element: <PaymentSuccess /> },
    { path: '/payment-fail', element: <PaymentFail /> },
    { path: '/account-create-success', element: <AccountCreateSuccess /> },
    { path: '/account-create-fail', element: <AccountCreateFail /> },
]);

export default router;
