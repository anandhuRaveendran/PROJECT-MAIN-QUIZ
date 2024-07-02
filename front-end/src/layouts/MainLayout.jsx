// layouts/MainLayout.js
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/','/register'];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
