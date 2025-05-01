import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/action";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

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
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2>Accedi</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
                email: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
