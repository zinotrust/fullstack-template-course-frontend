import { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import ShowOnLogin from "../protect/hiddenLink";
import { ShowOnLogout } from "./../protect/hiddenLink";
import { UserName } from "../admin/profile/Profile";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        React<span>Starter</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(logout());
    dispatch(RESET());
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className={styles.header}>
        <span className={styles.logoHeader}>{logo}</span>

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <ShowOnLogin>
              <li>
                <NavLink to="/admin/home" className={activeLink}>
                  Dashboard
                </NavLink>
              </li>
            </ShowOnLogin>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogin>
                <Link to="/admin/profile">
                  <FaUserCircle size={16} color="#ff7722" />
                  <UserName />
                </Link>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <Link to="/" onClick={logoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>
              {/* <NavLink to="/register" className={activeLink}>
                Register
              </NavLink> */}
            </span>
            <Link to="/">
              <button className="--btn --btn-primary">Get Started</button>
            </Link>
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
