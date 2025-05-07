import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d1117",
        color: "#f0f0f0",
      }}
    >
      <Row className="align-items-center w-100 gx-4">
        <Col xs={12} md={5} className="text-center mb-4 mb-md-0">
          <img
            src="mascot\what2gameMascotFull.png"
            alt="Mascotte triste"
            style={{ maxHeight: "80vh", width: "auto" }}
            className="mb-4"
          />
        </Col>
        <Col xs={12} md={7} className="text-center text-md-start">
          <h1>Oops! Qualcosa è andato storto</h1>
          <p className="lead mb-4">
            Ci dispiace, si è verificato un errore. Riprova più tardi o torna
            alla home.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate("/")}>
            Torna alla Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
