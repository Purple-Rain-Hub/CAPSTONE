import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import GamesCarousel from "./GamesCarousel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMostPlayed, fetchNewReleases } from "../../redux/action";
import Hero from "./Hero";

const HomePage = () => {
  const dispatch = useDispatch();

  const [newReleases, setNewReleases] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);

  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingMost, setLoadingMost] = useState(true);
  const [errorNew, setErrorNew] = useState(false);
  const [errorMost, setErrorMost] = useState(false);

  const loadNew = async () => {
    try {
      const nr = await dispatch(fetchNewReleases());
      if (!nr) throw new Error();
      setNewReleases(nr);
    } catch {
      setErrorNew(true);
    } finally {
      setLoadingNew(false);
    }
  };
  const loadMost = async () => {
    try {
      const mp = await dispatch(fetchMostPlayed());
      if (!mp) throw new Error();
      setMostPlayed(mp);
    } catch {
      setErrorMost(true);
    } finally {
      setLoadingMost(false);
    }
  };

  useEffect(() => {
    loadNew();
    loadMost();
  }, [dispatch]);

  return (
    <Container fluid className="mainContainer">
      {/* HERO */}
      <Hero />

      {/* CAROSELLO NUOVE USCITE */}
      <Container className="carousel-box mb-5">
        <h3 className="mb-3">Nuove Uscite</h3>
        {loadingNew ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : errorNew ? (
          <div className="text-danger text-center py-3">
            Errore nel caricamento delle nuove uscite
          </div>
        ) : (
          <GamesCarousel games={newReleases} itemsToShow={5} />
        )}
      </Container>
      {/* CAROSELLO PIÙ GIOCATI */}
      <Container className="carousel-box mb-5">
        <h3 className="mb-3">I Più Giocati</h3>
        {loadingMost ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : errorMost ? (
          <div className="text-danger text-center py-3">
            Errore nel caricamento dei più giocati
          </div>
        ) : (
          <GamesCarousel games={mostPlayed} itemsToShow={5} />
        )}
      </Container>

      {/* INFO BOX */}
      <Container fluid className="card-purple p-4 mb-5">
        <Row className=" align-items-center">
          <Col className="text-center">
            <h5>
              "But then there was fire. <br />
              And with fire, came disparity"
            </h5>
          </Col>
          <Col>
            <hr className="d-sm-none" />
            <h5 className=" mt-4">La nostra missione</h5>
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
