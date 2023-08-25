import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

const ProtectedRoute = () => {
  const { currentUser } = useUserContext();
  const location = useLocation();

  return (
    currentUser
      ? <Outlet />
      : <Navigate to="/landing" state={{ from: location }} replace />
  )
};

export default ProtectedRoute