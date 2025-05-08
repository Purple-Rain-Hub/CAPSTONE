import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/action";
import { Alert, Button, Container, Form, FloatingLabel } from "react-bootstrap";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(login(loginInfo));
    if (success) navigate("/");
  };

  return (
    <Container id="loginContainer">
      <div className="card-login position-relative d-md-flex justify-content-between">
        <img
          src="public\animeLogin.jpg"
          alt="anime login"
          className="img-fluid d-none d-md-block"
          style={{ maxHeight: "400px" }}
        />
        <div>
          <h2>Accedi</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
                value={loginInfo.email}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-4"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
            </FloatingLabel>

            <div className="d-grid">
              <Button type="submit" className="btn-login position-relative">
                Login
              </Button>
              <Button
                variant="outline-light"
                className="btn-register mt-2"
                onClick={() => navigate("/register")}
              >
                Non sei Registrato? Premi qui
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
