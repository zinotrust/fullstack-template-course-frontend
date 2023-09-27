import { Link } from "react-router-dom";

const { useSelector } = require("react-redux");
const {
  selectIsLoggedIn,
  selectUser,
} = require("../../redux/features/auth/authSlice");

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export const AdminOnlyLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === "admin") {
    return children;
  }
  return null;
};

export const AdminOnlyPage = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === "admin") {
    return children;
  }
  return (
    <div className="--center-all" style={{ minHeight: "80vh" }}>
      <h2>Unauthorized Access</h2>
      <p style={{ width: "500px" }}>
        Opps, looks like you do not have sufficient permission to view the
        content of this page. Please contact us if this is an error.
      </p>
      <br />
      <Link to={"/"}>
        <button className="--btn --btn-primary">Back To Home</button>
      </Link>
    </div>
  );
};
export const RestrictSuspendedUser = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === "suspended") {
    return (
      <div className="--center-all" style={{ minHeight: "80vh" }}>
        <h2>Account Suspended</h2>
        <p style={{ width: "500px" }}>
          Opps, looks like your account has been suspended. Please contact us if
          this is an error.
        </p>
        <br />
        <Link to={"/"}>
          <button className="--btn --btn-primary">Back To Home</button>
        </Link>
      </div>
    );
  }
  return children;
};

export default ShowOnLogin;
