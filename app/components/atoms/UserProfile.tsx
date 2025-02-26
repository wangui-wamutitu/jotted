import { Link, useLocation } from "@remix-run/react";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { getInitials } from "~/util";

const UserProfile = ({ username }: { username: string }) => {
  const [showLogoutBtn, setShowLogutBtn] = useState(false);
  const [showLogInBtn, setShowLogInBtn] = useState(false);

  const location = useLocation()

  return (
    <div className={'flex items-center'}>
      {username ? (
        <button
          onClick={() => setShowLogutBtn(!showLogoutBtn)}
          className={
            "w-8 h-8 flex justify-center items-center border border-dark_pink rounded-full mr-4 text-sm"
          }
        >
          {getInitials(username ?? "")}
        </button>
      ) : (
        <button
          onClick={() => setShowLogInBtn(!showLogInBtn)}
        >
          <FaRegUserCircle size={24} className={'mr-2'}/>
        </button>
      )}
      {(showLogoutBtn && location?.pathname !== '/logout') ? <Link to={'/logout'}><div className={'w-[120px] border border-dark_pink rounded-md text-center py-1 cursor-pointer mr-4'}>Logout</div></Link> : null}
      {(showLogInBtn && location?.pathname !== '/login') ? <Link to={'/login'}><div className={'w-[120px] border border-dark_pink rounded-md text-center py-1 cursor-pointer mr-4'}>LogIn</div></Link> : null}
    </div>
  );
};

export default UserProfile;
