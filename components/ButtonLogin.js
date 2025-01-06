import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, extraStyle }) => {
  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Hi {name} Dashboard
      </Link>
    );
  } else {
    return <Link href="/dashboard">Login</Link>;
  }
};

export default ButtonLogin;
