import {
  FaHome,
  FaUserNurse,
  FaUser,
  FaUserInjured,
} from "react-icons/fa";
// import { BiCalendarPlus } from "react-icons/bi";
// import { MdCalendarToday } from "react-icons/md";

export const getSidebarLinks = (role, activeId) => {
  if (role === "admin") {
    return [
      {
        id: 1,
        text: "Calendrier",
        path: "/admin",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Employés",
        path: "/",
        icon: <FaUserNurse />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 3,
        text: "Statistiques",
        path: "/admin/statistique",
        icon: <FaUserInjured />,
        // dividerAfter: true,
        isActive: activeId === 3 ? true : false,
      },
      {
        id: 4,
        text: "Pharmacie",
        path: "/admin/stock",
        icon: <FaUser />,
        isActive: activeId === 4 ? true : false,
      },
     {
        id: 5,
        text: "Opérations",
        path: "/admin/operations",
        icon: <FaUser />,
        isActive: activeId === 5 ? true : false,
      },
    ];
  }
};
