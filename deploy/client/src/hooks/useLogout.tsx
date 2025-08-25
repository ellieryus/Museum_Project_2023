import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  }

  return { logout }
}

export default useLogout;