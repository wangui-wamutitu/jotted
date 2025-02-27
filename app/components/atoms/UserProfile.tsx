import { Link, useLocation } from "@remix-run/react";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useUserStore } from "~/stores/userDetailsStore";
import { getInitials } from "~/util";

const UserProfile = () => {
  const [showLogoutBtn, setShowLogutBtn] = useState(true);
  const [showLogInBtn, setShowLogInBtn] = useState(false);  
  const user = useUserStore((state) => state.user);
  const location = useLocation()  

  return (
    <div className={'flex items-center'}>
      {user?.username ? (
        <button
          onClick={() => setShowLogutBtn(!showLogoutBtn)}
          className={
            "w-8 h-8 flex justify-center items-center border border-dark_pink rounded-full mr-4 text-sm"
          }
        >
          {getInitials(user?.username ?? "")}
        </button>
      ) : (
        <button
          onClick={() => setShowLogInBtn(!showLogInBtn)}
        >
          <FaRegUserCircle size={24} className={'mr-2'}/>
        </button>
      )}
      {(showLogoutBtn && user && location?.pathname !== '/logout') ? <Link to={'/logout'}><div className={'w-[120px] border border-dark_pink rounded-md text-center py-1 cursor-pointer mr-4'}>Logout</div></Link> : null}

      {(showLogInBtn && !user && location?.pathname !== '/login') ? <Link to={'/login'}><div className={'w-[120px] border border-dark_pink rounded-md text-center py-1 cursor-pointer mr-4'}>LogIn</div></Link> : null}

      {user?.role === "WRITER" && showLogoutBtn ? <Link to={'/write'}><div className={'w-[120px] border border-dark_pink rounded-md text-center py-1 cursor-pointer mr-4'}>Write</div></Link> : null}
    </div>
  );
};

export default UserProfile;
