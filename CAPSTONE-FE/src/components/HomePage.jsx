import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GamesCarousel from "./GamesCarousel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMostPlayed, fetchNewReleases } from "../redux/action";
import Hero from "./Hero";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newReleases, setNewReleases] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //da aggiungere try catch
  const fetchCarousels = async () => {
    const nr = await dispatch(fetchNewReleases());
    const mp = await dispatch(fetchMostPlayed());
    if (nr == null || mp == null) {
      setError(true);
      setLoading(false);
      return;
    }

    setNewReleases(nr);
    setMostPlayed(mp);
    setError(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  if (loading) {
    return (
      <Container
        fluid
        className="mainContainer d-flex vh-100 align-items-center justify-content-center"
      >
        <Spinner animation="grow" variant="light" />
      </Container>
    );
  }

  return (
    <Container fluid className="mainContainer">
      {/* HERO */}
      <Hero />

      {/* CAROSELLO NUOVE USCITE */}
      <Container className="mb-5">
        <h3 className="mb-3">Nuove Uscite</h3>
        <GamesCarousel title="" games={newReleases} itemsToShow={5} />
      </Container>

      {/* CAROSELLO PIÙ GIOCATI */}
      <Container className="mb-5">
        <h3 className="mb-3">I Più Giocati</h3>
        <GamesCarousel title="" games={mostPlayed} itemsToShow={5} />
      </Container>

      {/* INFO BOX */}
      <Container fluid className="card-purple p-4 mb-5">
        <Row>
          <Col className="text-center">
            <h5>"Play with passion, win with style!"</h5>
          </Col>
          <Col>
            <h5>La nostra missione</h5>
            <p>
              Aiutarti a trovare il gioco perfetto basato sui tuoi gusti, grazie
              a un quiz rapido e divertente.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
