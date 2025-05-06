import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Container id="hero" className="card-purple p-4 mb-5">
      <Row className="align-items-center">
        {/* Colonna immagine */}
        <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
          <img
            src="/mascot/what2gameMascotHalf.png"
            alt="mascotHero"
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </Col>

        {/* Colonna testo */}
        <Col xs={12} md={8} className="text-center text-md-start">
          <h2 className="mb-3">Scopri il tuo prossimo videogioco!</h2>
          <Button
            className="btn-survey px-4 py-2"
            onClick={() => navigate("/Survey")}
          >
            Inizia il Quiz
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
