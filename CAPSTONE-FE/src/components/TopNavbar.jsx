import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");
  const role = useSelector((state) => state.auth.role);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar-neon py-3" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="/logoController.png"
            alt="logo"
            width={40}
            className="me-2"
          />
          <span className="brand-text">What2Game</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="border-0" />

        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Survey">Quiz</Nav.Link>
            {role === "Admin" && (
              <Nav.Link href="/CreateSurvey">Crea Quiz</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            {!token && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Registrati</Nav.Link>
              </>
            )}
            {token && (
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
