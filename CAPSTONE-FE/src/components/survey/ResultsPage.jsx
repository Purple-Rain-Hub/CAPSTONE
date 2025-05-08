import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSurvey } from "../../redux/action";
import { Button, Card, Container, Spinner } from "react-bootstrap";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitSurvey = useSelector((state) => state.survey);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    //controllo se ci sono risposte
    if (!submitSurvey || submitSurvey.length === 0) {
      navigate("/Survey");
      return;
    }

    //invio dati backend e torno i dettagli dei giochi
    const data = await dispatch(handleSurvey(submitSurvey));
    if (!data) {
      alert("Si è verificato un errore, riprova.");
      navigate("/Survey");
      return;
    }

    setGames(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [dispatch, submitSurvey, navigate]);

  if (loading) {
    return (
      <Container
        id="resultsContainer"
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <Spinner animation="border" />
        <p className="mt-3">Elaborazione dei risultati…</p>
      </Container>
    );
  }

  if (!games || games.length === 0) {
    return (
      <Container id="resultsContainer" className="text-center">
        <h4>Nessun gioco consigliato trovato.</h4>
      </Container>
    );
  }

  const top5 = games.slice(0, 5);
  const [first, ...rest] = top5;

  return (
    <Container id="resultsContainer">
      <h2 className="text-center">I tuoi Top 5</h2>

      <Card className="card-featured d-lg-flex flex-lg-row">
        {first.cover && <Card.Img src={first.cover} alt={first.name} />}
        <Card.Body className="card-body">
          <Card.Title as="h3" className="text-white">
            1. {first.name}
          </Card.Title>
          {first.summary && (
            <Card.Text className="text-light">
              {first.summary.length > 200
                ? first.summary.slice(0, 200) + "…"
                : first.summary}
            </Card.Text>
          )}
          <Button
            className="btn-igdb mt-3 align-self-start"
            href={first.url}
            target="_blank"
          >
            Vedi su IGDB
          </Button>
        </Card.Body>
      </Card>

      {/* Positions 2–5 */}
      <div className="top-grid mt-4">
        {rest.map((g, idx) => (
          <Card key={g.id} className="card-top">
            {g.cover && <Card.Img src={g.cover} alt={g.name} />}
            <Card.Body className="card-body">
              <Card.Title as="h5" className="text-white mb-2">
                {idx + 2}. {g.name}
              </Card.Title>
              <Button className="btn-igdb" href={g.url} target="_blank">
                Dettagli
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ResultsPage;
