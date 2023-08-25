import { HeaderWrapper } from "../../assets/wrappers";
import Logo from "../Logo";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <Search />
      <Navbar />
    </HeaderWrapper>
  )
}
export default Header