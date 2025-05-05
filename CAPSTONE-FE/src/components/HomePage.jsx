import { Button, Col, Container, Spinner } from "react-bootstrap";
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
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento dei contenuti..</p>
      </Container>
    );
  }

  return (
    <Container className="p-1 p-lg-4">
      <Container
        id="hero"
        className="d-flex justify-content-between bg-success p-0"
      >
        <img src="https://placecats.com/500/400" alt="animeHero" />
        <Container className="text-center my-auto">
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
          className="my-4 border border-4 py-4 bg-warning border-danger row"
        >
          <Col className="text-center">
            <h5>"citazione bella ciao a tutti e tutte scrivere scrivere"</h5>
          </Col>
          <Col>
            <h5>obbiettivo bello ciato a tutti</h5>
            <h6>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
              nostrum sequi?
            </h6>
          </Col>
        </Container>
      </Container>
    </Container>
  );
};

export default HomePage;
