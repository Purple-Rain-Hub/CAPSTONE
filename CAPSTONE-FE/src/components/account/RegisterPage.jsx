import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/action";

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
    <Container className="mt-5" style={{ maxWidth: 500 }}>
      <h2>Registrati</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            required
            value={registerInfo.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="firstName"
            required
            value={registerInfo.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            name="lastName"
            required
            value={registerInfo.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data di nascita</Form.Label>
          <Form.Control
            name="birthDate"
            type="date"
            required
            value={registerInfo.birthDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            required
            value={registerInfo.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Registrati</Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
