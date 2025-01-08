"use client";

import Link from "next/link";
import { signIn } from "next-auth/react"; /* importing from the package, not our auth.js as this is client component and do not want to disclosure secrets */

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardUrl = "/dashboard";

  if (session) {
    return (
      <Link
        href={dashboardUrl}
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome back {session.user.name || "friend"}
      </Link>
    );
  } else {
    return (
      <button
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
        onClick={() => {
          signIn(undefined, { callbackUrl: dashboardUrl });
        }}
      >
        Get started
      </button>
    );
  }
  // 1. Create a /login page

  // 2. Create an email/password form

  // 3. Make a POST request to /api/login
};

export default ButtonLogin;
