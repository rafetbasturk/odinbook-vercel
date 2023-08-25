import { NavWrapper } from "../../assets/wrappers";
import Notifications from './Notifications';
import UserMenu from "./UserMenu";


const Navbar = () => {
  return (
    <NavWrapper>
      <Notifications />
      <UserMenu />
    </NavWrapper>
  )
}
export default Navbar