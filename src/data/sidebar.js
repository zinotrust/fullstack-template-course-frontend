import { FaTh, FaUsers } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/admin/home",
  },
  {
    title: "Account",
    icon: <BiUserCircle />,
    children: [
      {
        title: "Profile",
        icon: <BiUserCircle />,
        path: "/admin/profile",
      },
      {
        title: "My Subscription",
        path: "/admin/account",
      },
    ],
  },
];

export const adminMenu = [
  {
    title: "Users",
    icon: <FaUsers />,
    path: "/admin/users",
  },
];

export default menu;
