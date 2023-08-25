import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Logo = () => {
  const location = useLocation();

  const handleClick = e => {
    if (location.pathname === "/") {
      e.preventDefault();
    }
  };

  return (
    <Link to={"/"} className="logo" onClick={handleClick}>
      <img src={logo} alt="odinbook project by rafet" />
    </Link>
  )
}

export default Logo