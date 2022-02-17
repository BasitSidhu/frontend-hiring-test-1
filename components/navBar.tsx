import React from "react";


import { useRouter } from "next/router";
export default function NavBar() {
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    router.push("/");
  }

  return (
    <nav>
      <div className="nav-wrapper center white">
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {sessionStorage.getItem("access_token") && (
            <li>
              <button onClick={handleLogout} className="btn btn-primary m-2">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
