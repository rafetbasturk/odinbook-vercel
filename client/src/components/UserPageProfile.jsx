import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useUserContext from "../hooks/useUserContext";
import Profile from "./Profile";

const UserPageProfile = () => {
  const { id } = useParams();
  const { currentUser, user, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, mutualFriends } = useUserContext();
  const [status, setStatus] = useState(
    user?.receivedFriendRequests?.includes(currentUser._id)
      ? "Friend request pending..."
      : user?.friends?.includes(currentUser._id)
        ? "Friend"
        : "Add Friend"
  );

  const handleClick = async () => {
    const res = await sendFriendRequest(id)
    if (res.ok) setStatus("Friend request pending...")
  }

  const handleAccept = (id) => {
    currentUser.receivedFriendRequests?.forEach(sender => {
      if (sender._id === id) {
        acceptFriendRequest(id)
        setStatus("Friend")
      }
    });
  }

  const handleReject = (id) => {
    rejectFriendRequest(id)
  }

  return (
    <div className="user-page-top">
      <div className="profile-container">
        <Profile {...user} mutualFriends={mutualFriends} />
        {currentUser._id === user?._id
          ? <Link to={"/profile"} className="btn">Edit Profile</Link>
          : !user?.sentFriendRequests?.includes(currentUser._id) &&
          <button
            type="button"
            className="btn"
            onClick={handleClick}
            disabled={status === "Friend request pending..." || status === "Friend"}
          >
            {status}
          </button>
        }
      </div>

      {user?.sentFriendRequests?.includes(currentUser._id) &&
        <div className="request">
          <div><span className="name">{user?.name}</span> sent you a friendship request.</div>
          <div className="btns">
            <button className="btn" onClick={() => handleAccept(user?._id)}>Accept</button>
            <button className="btn" onClick={() => handleReject(user?._id)}>Reject</button>
          </div>
        </div>
      }
    </div>
  );
}

export default UserPageProfile
