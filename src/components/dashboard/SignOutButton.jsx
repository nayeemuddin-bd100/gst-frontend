import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // make sure this is correct

const SignOutButton = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        window.location.href = "/#/"; // or use React Router's useNavigate
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <button style={{width : "80%", margin : "24px"}} className="btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default SignOutButton;
