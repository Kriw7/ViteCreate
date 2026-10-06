import { Link } from "react-router";

function Header() {
  return (
    <header>
      <h1><Link className="header_link" to={"/"}> My Blog</Link></h1>
      <p>Welcome to my blog! <Link className="header_link" to={"/about"}>About me...</Link> </p>
    </header>
  );
}

export default Header;
