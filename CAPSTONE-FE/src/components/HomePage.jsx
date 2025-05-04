import { Button, Container, Spinner } from "react-bootstrap";
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

  //da aggiungere try catch
  const fetchCarousels = async () => {
    const nr = await dispatch(fetchNewReleases());
    const mp = await dispatch(fetchMostPlayed());

    setNewReleases(nr);
    setMostPlayed(mp);
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
    <Container className="p-4">
      <Container
        id="hero"
        className="d-flex justify-content-between bg-success p-0"
      >
        <img src="https://placecats.com/500/450" alt="animeHero" />
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
      </Container>
      <Container id="mostPlayed">
        <GamesCarousel
          title={"I più Giocati"}
          itemsToShow={5}
          games={mostPlayed}
        />
      </Container>
      <Container id="info"></Container>
    </Container>
  );
};

export default HomePage;
