import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey } from "../../redux/action";
import { useNavigate } from "react-router-dom";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  // fetch questions
  useEffect(() => {
    (async () => {
      const existing = await dispatch(getSurvey());
      if (existing && existing.length) {
        setSurvey(existing);
        dispatch({ type: "RESET_SURVEY_CONTENT" });
      } else {
        setFetchError(true);
      }
    })();
  }, [dispatch]);

  const handleStart = () => setCurrentIndex(0);

  const handleNext = () => {
    const q = survey[currentIndex];
    const chosen = q.answers.find((a) => a.answerId === selectedAnswerId);
    dispatch({
      type: "SAVE_SURVEY_CONTENT",
      payload: {
        question: q.question,
        answer: chosen.answer,
        answerId: chosen.answerId,
        points: q.points,
      },
    });
    setSelectedAnswerId(null);
    currentIndex + 1 < survey.length
      ? setCurrentIndex((i) => i + 1)
      : navigate("/SurveyResults");
  };

  // error / loading states
  if (fetchError) {
    return (
      <Container fluid id="surveyContainer">
        <h1 className="text-danger text-center">Errore caricamento quiz</h1>
      </Container>
    );
  }
  if (survey.length === 0) {
    return (
      <Container fluid id="surveyContainer">
        <h1 className="text-center text-warning">Caricamento domande…</h1>
      </Container>
    );
  }
  if (currentIndex === -1) {
    return (
      <Container
        fluid
        id="surveyContainer"
        className="d-flex align-items-center justify-content-center p-4"
        style={{ minHeight: "85vh" }}
      >
        <Row className="align-items-center w-100 gx-4">
          <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
            <img
              src="/mascot/what2gameMascotFull.png"
              alt="Emily Mascot"
              className="img-fluid"
              style={{ maxHeight: "80vh", width: "auto" }}
            />
          </Col>

          <Col xs={12} md={6} className="text-center text-md-start">
            <h1 className="mb-4">
              Ciao, sono Emily!
              <br />
              Pronto a scoprire il tuo prossimo gioco preferito?
            </h1>
            <Button className="btn-survey px-5 py-3" onClick={handleStart}>
              Inizia Quiz
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  const current = survey[currentIndex];
  const isLast = currentIndex === survey.length - 1;

  return (
    <Container
      fluid
      id="surveyContainer"
      className="d-flex justify-content-center align-items-center"
    >
      <Card
        className="card-survey p-4"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <small className="text-secondary mb-2 d-block">
          Domanda {currentIndex + 1} / {survey.length}
        </small>

        <h2 className="mb-4 text-white">{current.question}</h2>

        {/* risposte */}
        <div className="d-grid gap-3 mb-4">
          {current.answers.map((a, i) => (
            <Button
              key={i}
              className={`btn-answer ${
                selectedAnswerId === a.answerId ? "active" : ""
              }`}
              size="lg"
              onClick={() => setSelectedAnswerId(a.answerId)}
            >
              {a.answer}
            </Button>
          ))}
        </div>

        {/* avanti */}
        <div className="d-flex justify-content-end">
          <Button
            className="btn-next"
            onClick={handleNext}
            disabled={selectedAnswerId == null}
          >
            {isLast ? "Risultati" : "Avanti"}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default SurveyPage;
