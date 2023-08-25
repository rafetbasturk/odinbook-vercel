import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { MdOutlineLogout, MdKeyboardArrowDown } from "react-icons/md";
import { IconWrapper } from "../../assets/wrappers";
import { Profile, ProfileImage } from "../";
import useUserContext from "../../hooks/useUserContext";
import useLogout from "../../hooks/useLogout";
import useOutsideClick from "../../hooks/useOutsideClick";
import useAlert from "../../hooks/useAlertContext";

const UserMenu = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser } = useUserContext();
  const logout = useLogout();
  const userMenuRef = useRef(null);
  useOutsideClick(userMenuRef, setShowUserMenu);
  const { showAlert } = useAlert();

  const handleLogout = () => {
    logout();
    showAlert("success", "Logged out")
  }

  return (
    <div ref={userMenuRef} className="user-menu-container">
      <IconWrapper onClick={() => setShowUserMenu(!showUserMenu)}>
        <ProfileImage image={currentUser?.image} />
        <MdKeyboardArrowDown className="down" />
      </IconWrapper>
      <div
        className="user-menu"
        style={{ display: showUserMenu ? "flex" : "none" }}
      >
        <Link to={`${currentUser?._id}`} className="user-btn" onClick={() => setShowUserMenu(false)}>
          <Profile {...currentUser} />
        </Link>
        <button type="button" onClick={handleLogout} className="user-btn">
          <IconWrapper>
            <MdOutlineLogout className="icon" />
          </IconWrapper>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu