import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  };

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src="public\logoController.png" alt="logo" width={"45px"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Survey">Nuovo Quiz</Nav.Link>
            <Nav.Link href="/CreateSurvey">Crea Quiz</Nav.Link>
          </Nav>
          <Nav>
            {!token && <Nav.Link href="/login">Login</Nav.Link>}
            {token && (
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            )}
            {!token && <Nav.Link href="/register">Registrati</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
