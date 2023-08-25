import useUserContext from "../hooks/useUserContext";
import ProfileImage from "./ProfileImage";
import { DateTime } from "luxon";

const Profile = ({ type, name, image, friends, createdAt, receivedFriendRequests, mutualFriends }) => {
  const { currentUser } = useUserContext();
  const date = DateTime.fromISO(createdAt).toFormat('dd LLL yy');

  return (
    <div className="profile">
      <ProfileImage image={image} />
      <div className="profile-info">
        <div className="name">{name}</div>

        {type === "post" && <div className="date">{date}</div>}

        {type === "search" &&
          <div className="status-info">
            {receivedFriendRequests?.includes(currentUser._id)
              ? <span className="status">Friend request pending...</span>
              : friends?.includes(currentUser._id)
                ? <span className="status">Friend</span>
                : friends?.length > 0 && <span className="friends-count">
                  {friends?.length} {friends?.length === 1 ? "friend" : "friends"}</span>}
          </div>}

        {type === undefined && friends?.length > 0 &&
          <div className="friends-count">
            <span>{friends?.length} {friends?.length === 1 ? "friend" : "friends"}</span>
            {mutualFriends > 0 && <span> · </span>}
            {mutualFriends > 0 && <span>{mutualFriends} {mutualFriends === 1 ? "mutual" : "mutuals"}</span> }
          </div>}
      </div>
    </div>
  )
}
export default Profile