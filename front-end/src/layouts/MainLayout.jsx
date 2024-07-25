// layouts/MainLayout.js
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const MainLayout = () => {
  const location = useLocation();
  const noNavBarRoutes = ['/', '/register'];

  const shouldHideNavBar = noNavBarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavBar && <NavBar />}
      <main>
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default MainLayout;
