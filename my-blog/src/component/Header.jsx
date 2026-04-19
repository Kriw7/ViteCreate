function Header(props) {
  return (
    <header>
      <h1>My Blog</h1>
      <p>Welcome to my blog!</p>
      <button onClick={props.addCard}> Add new Article! </button>
    </header>
  );
}

export default Header;
