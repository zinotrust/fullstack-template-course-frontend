import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET, loginWithGoogle } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [urlParams] = useSearchParams();
  const method = urlParams.get("method");
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // temporary state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/admin/home");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    console.log("google");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        dispatch(loginWithGoogle({ userToken: user.accessToken }));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, {
      url: `${process.env.REACT_APP_FRONTEND_URL}/login?method=emailLink`,
      handleCodeInApp: true,
    })
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        toast.success("Sign in link has been sent to your email.");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (!isLoggedIn && method === "emailLink") {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("emailForSignIn");
        if (!email) {
          return toast.error("Please provide your email");
        }

        signInWithEmailLink(
          auth,
          localStorage.getItem("emailForSignIn"),
          window.location.href
        )
          .then((result) => {
            console.log(result.user);
            const user = result.user;
            dispatch(loginWithGoogle({ userToken: user.accessToken }));
            localStorage.removeItem("emailForSignIn");
          })
          .catch((error) => {
            console.log(error.message);
            toast.error(error.message);
          });
      }
    }
  }, [method, isLoggedIn, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <p className="--my --center-all"> Or get a Login Link</p>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block">
                Send Login Link
              </button>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
