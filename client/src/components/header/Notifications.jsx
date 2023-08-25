import { Link } from "react-router-dom";
import { MdNotifications } from "react-icons/md";
import { useRef, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { IconWrapper } from "../../assets/wrappers";
import ProfileImage from "../ProfileImage";
import useOutsideClick from "../../hooks/useOutsideClick";

const Notifications = () => {
  const { currentUser, acceptFriendRequest, rejectFriendRequest } = useUserContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  
  useOutsideClick(notificationRef, setShowNotifications)

  const handleAccept = (id) => {
    acceptFriendRequest(id)
    setShowNotifications(false)
  }

  const handleReject = (id) => {
    rejectFriendRequest(id)
    setShowNotifications(false)
  }

  return (
    <div ref={notificationRef} className="notifications-container">
      <IconWrapper onClick={() => setShowNotifications(!showNotifications)}>
        <MdNotifications className="notification" />
        {currentUser?.receivedFriendRequests?.length > 0 &&
          <span className="count">{currentUser?.receivedFriendRequests?.length}</span>}
      </IconWrapper>

      {currentUser?.receivedFriendRequests?.length > 0 &&
        <div
          className="notifications"
          style={{ display: showNotifications ? "flex" : "none" }}
        >
          {currentUser?.receivedFriendRequests?.map(sender => {
            return (
              <div key={sender._id} className="request-profile">
                <Link to={`/${sender._id}`} className="notification" onClick={() => setShowNotifications(false)}>
                  <ProfileImage image={sender.image} />
                  <div><span className="name">{sender.name}</span> sent you a friendship request.</div>
                </Link>

                <div className="btns">
                  <button className="btn" type="button" onClick={() => handleAccept(sender._id)}>Accept</button>
                  <button className="btn" type="button" onClick={() => handleReject(sender._id)}>Reject</button>
                </div>
              </div>
            )
          })}
        </div>}
    </div>
  );
}

export default Notifications