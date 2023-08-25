import { DateTime } from "luxon";
import { useState } from "react";
import useUserContext from "../hooks/useUserContext";
import { InputElement, ProfileImage } from "../components";
import { ProfileWrapper } from "../assets/wrappers";
import useAlert from "../hooks/useAlertContext";

const Profile = () => {
  const { uploadImage, currentUser } = useUserContext();
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { showAlert } = useAlert();

  const date = DateTime.fromISO(currentUser.createdAt).toFormat('dd LLLL yyyy')


  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      showAlert("danger", "Please select an image to upload!")
      return
    }
    const formData = new FormData();
    formData.append('image', file);
    uploadImage(formData);
  }

  return (
    <ProfileWrapper>
      <h2>Profile</h2>
      <div className="container">
        <div className="image-upload" >
          <ProfileImage image={currentUser?.image} alt={currentUser.name} />
          {!showForm && <button type="button" className="btn" onClick={() => setShowForm(true)}>Upload new photo</button>}
          {showForm && <form onSubmit={handleUpload} className="file-form">
            <InputElement
              type="file"
              name="image"
              id="image"
              handleChange={handleChange}
              className="custom-file-upload"
            />
            <button type="submit" className="btn">Upload</button>
          </form>}
        </div>
        <div className="info">
          <h3>Profile Information</h3>
          <div>
            <p>Name: {currentUser?.name}</p>
            <p>Email: {currentUser?.email}</p>
            <p>Member since: {date}</p>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  )
}
export default Profile