import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GamesCarousel from "./GamesCarousel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMostPlayed, fetchNewReleases } from "../redux/action";

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
        className="text-center mainContainer d-flex align-items-center justify-content-center"
      >
        <div>
          <Spinner animation="border" />
          <p>Caricamento dei contenuti..</p>
        </div>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="p-1 p-lg-4 d-flex flex-column mainContainer"
      id="home"
    >
      <Container
        id="hero"
        className="d-flex justify-content-between p-0 animated-purple rounded-4"
      >
        <img
          src="\mascot\what2gameMascotHalf.png"
          alt="mascotHero"
          className="mx-auto w-25"
        />
        <Container className="text-center my-auto w-50">
          <h2>Vieni e fai il nostro quiz</h2>
          <Button
            onClick={() => {
              navigate("/Survey");
            }}
          >
            Survey
          </Button>
        </Container>
      </Container>
      <Container id="newReleases">
        <GamesCarousel
          title={"Nuove Uscite"}
          itemsToShow={5}
          games={newReleases}
        />
        {error && (
          <span className="bg-danger p-2 my-4">
            Errore nel caricamento dei contenuti
          </span>
        )}
      </Container>
      <Container id="mostPlayed">
        <GamesCarousel
          title={"I più Giocati"}
          itemsToShow={5}
          games={mostPlayed}
        />
        {error && (
          <span className="bg-danger p-2 my-4">
            Errore nel caricamento dei contenuti
          </span>
        )}
      </Container>
      <Container id="info">
        <Container
          fluid
          className="my-4 border border-4 py-4 bg-warning border-danger"
        >
          <Row>
            <Col className="text-center">
              <h5>"citazione bella ciao a tutti e tutte scrivere scrivere"</h5>
            </Col>
            <Col>
              <h5>obbiettivo bello ciato a tutti</h5>
              <h6>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Fugiat, nostrum sequi?
              </h6>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default HomePage;
