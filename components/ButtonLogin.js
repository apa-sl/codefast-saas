import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name }) => {
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Hi {name} Dashboard
      </Link>
    );
  } else {
    return <Link href="/dashboard">Login</Link>;
  }
};

export default ButtonLogin;
