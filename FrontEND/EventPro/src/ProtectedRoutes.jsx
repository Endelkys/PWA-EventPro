import Loading from "./components/Animation/Loading";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return <Loading />
  }  
  if (!loading && !isAuthenticated) {
    return <Navigate to={"/login"} replace/>
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedRoutes
