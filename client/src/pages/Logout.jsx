import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";


const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return null;
};

export default Logout;
