import { Link, Navigate } from "react-router-dom";
import { LandingWrapper } from "../assets/wrappers";
import { Logo } from "../components";
import useUserContext from "../hooks/useUserContext";
import useAuthContext from "../hooks/useAuthContext";

const Landing = () => {
  const { login } = useAuthContext();
  const { currentUser, userLoading } = useUserContext();

  const handleClick = () => {
    const demoUser = { email: 'rafet@gmail.com', password: '1234' }
    login(demoUser, "login");
  }

  return (
    <LandingWrapper>
      {currentUser && <Navigate to='/' />}
      <section className="landing">
        <div className="top">
          <Logo className="logo" />
          <h2>The final project within the curriculum of the Odin Project.</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste unde praesentium recusandae id reprehenderit eveniet similique eligendi dolor aspernatur blanditiis molestiae, delectus itaque, error provident quaerat cupiditate fugit hic neque!</p>
        </div>
        <Link to='/login' className='btn'>
          Login / Register
        </Link>
        <button
          type="button"
          className="btn btn-demo"
          disabled={userLoading}
          onClick={handleClick}
        >Demo User</button>
      </section>
    </LandingWrapper>
  )
}

export default Landing