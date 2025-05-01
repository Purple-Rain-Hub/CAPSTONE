import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSurvey } from "../redux/action";

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
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Elaborazione dei risultati…</p>
      </Container>
    );
  }

  if (!games || games.length === 0) {
    return (
      <Container className="mt-5">
        <h4>Nessun gioco consigliato trovato.</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Giochi consigliati per te</h2>
      <div className="d-flex flex-wrap gap-3">
        {games.map((g) => (
          <Card key={g.id} style={{ width: "18rem" }}>
            {g.cover && (
              <Card.Img variant="top" src={g.cover} alt={`${g.name} cover`} />
            )}
            <Card.Body>
              <Card.Title>{g.name}</Card.Title>
              {g.summary && <Card.Text>{g.summary}</Card.Text>}
              <Button
                href={`https://www.igdb.com/games/${g.id}`}
                target="_blank"
              >
                Vedi su IGDB
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ResultsPage;
