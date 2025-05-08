import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Container
      id="hero"
      className="card-purple p-4 mb-5 d-flex flex-column flex-md-row align-items-center"
    >
      {/* Colonna immagine */}
      <div className="text-center mb-4 mb-md-0" style={{ flex: "0 0 40%" }}>
        <img
          src="/mascot/what2gameMascotHalf.png"
          alt="mascotHero"
          className="img-fluid"
          style={{ maxHeight: "300px" }}
        />
      </div>

      {/* Colonna testo */}
      <div className="text-center text-md-start flex-fill ps-md-4">
        <h2 className="mb-3">Scopri il tuo prossimo videogioco!</h2>
        <Button
          className="btn-survey px-4 py-2"
          onClick={() => navigate("/Survey")}
        >
          Inizia il Quiz
        </Button>
      </div>
    </Container>
  );
};

export default Hero;
