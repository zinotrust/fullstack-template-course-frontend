import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import useRedirectUser from "../../../customHooks/useRedirectUser";

const Home = () => {
  useRedirectUser("/login");

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h3>Dashboard ~</h3>
          <p>
            This is the user's <b>Dashboard Page</b>
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
