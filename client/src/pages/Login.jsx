import { LoginForm, Logo } from '../components';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginWrapper } from "../assets/wrappers";
import useUserContext from "../hooks/useUserContext";

const Login = () => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        navigate("/")
      }, 3000)
    }
  }, [currentUser, navigate])

  return (
    <LoginWrapper>
      <div className="logo-container">
        <Logo />
        <h2>The final project within the curriculum of the Odin Project.</h2>
      </div>

      <LoginForm />
    </LoginWrapper>
  )
}
export default Login