import React from "react";
import "./UsersStats.scss";
import InfoBox from "../infoBox/InfoBox";
import { FaUsers } from "react-icons/fa";
import { BiUserCheck, BiUserX } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { countUserRole } from "../../utils";

const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <AiOutlineUserSwitch size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

const UserStats = () => {
  const { users } = useSelector((state) => state.auth);

  const noOfAdmin = countUserRole("admin", users);
  const noOfAuthor = countUserRole("author", users);
  const noOfSuspended = countUserRole("suspended", users);

  return (
    <div className="user-stats">
      <h3 className="--mt">User Stats</h3>
      <div className="info-boxes">
        <InfoBox
          icon={icon1}
          title={"Total Users"}
          count={users.length}
          bgColor="card1"
        />

        <InfoBox
          icon={icon2}
          title={"Admin"}
          count={noOfAdmin}
          bgColor="card2"
        />

        <InfoBox
          icon={icon3}
          title={"Author"}
          count={noOfAuthor}
          bgColor="card3"
        />

        <InfoBox
          icon={icon4}
          title={"Suspended"}
          count={noOfSuspended}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default UserStats;
