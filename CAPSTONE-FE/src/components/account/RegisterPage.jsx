import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/action";
import { Alert, Button, Container, Form, FloatingLabel } from "react-bootstrap";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(register(registerInfo));
    if (success) navigate("/login");
  };

  return (
    <Container id="registerContainer">
      <div className="card-login position-relative">
        <h2>Registrati</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              value={registerInfo.email}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingFirstName"
            label="Nome"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Mario"
              required
              value={registerInfo.firstName}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingLastName"
            label="Cognome"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Rossi"
              required
              value={registerInfo.lastName}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingBirthDate"
            label="Data di nascita"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="birthDate"
              placeholder="1990-01-01"
              required
              value={registerInfo.birthDate}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-4"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
              value={registerInfo.password}
              onChange={handleChange}
            />
          </FloatingLabel>

          <div className="d-grid gap-2">
            <Button type="submit" className="btn-login position-relative">
              Registrati
            </Button>
            <Button
              variant="outline-light"
              className="btn-register"
              onClick={() => navigate("/login")}
            >
              Ho già un account
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
