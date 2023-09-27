import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Card from "../../card/Card";
import { Spinner } from "../../loader/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updatePhoto,
  updateUser,
} from "../../../redux/features/auth/authSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { shortenText } from "../../../utils";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
      });
    }
  }, [user]);

  const updateProfile = (e) => {
    e.preventDefault();
    if (!profile.name || !profile.phone) {
      return toast.error("Please fill in name and phone");
    }
    const userData = {
      name: profile.name,
      phone: profile.phone,
    };

    dispatch(updateUser(userData));
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageURL;

    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/zinotrust/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }

      // Save photo to MongoDB
      const userData = {
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updatePhoto(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="profile">
      <h3>Profile ~</h3>

      <Card cardClass={"card"}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="profile-photo">
              <div>
                <img
                  src={imagePreview === null ? profile?.photo : imagePreview}
                  alt="profileImg"
                />
                <h3>Role: {profile?.role}</h3>
                {imagePreview !== null && (
                  <div className="--center-all">
                    <button
                      className="--btn --btn-secondary"
                      onClick={savePhoto}
                    >
                      <AiOutlineCloudUpload size={18} /> &nbsp; Upload Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={updateProfile}>
              <p>
                <label>Change Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
              </p>
              <p>
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={profile?.email}
                  onChange={handleInputChange}
                  disabled
                />
              </p>
              <p>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </p>
              <button type="submit" className="--btn --btn-primary --btn-block">
                Update Profile
              </button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);
  const username = user?.name || "...";

  return (
    <span style={{ color: "#ff7722" }}>Hi, {shortenText(username, 9)} |</span>
  );
};

export default Profile;
