const ProfileImage = ({ image }) => {
  return <img src={image === "default.jpg" ? `/images/${image}` : image} alt="user" />
}
export default ProfileImage