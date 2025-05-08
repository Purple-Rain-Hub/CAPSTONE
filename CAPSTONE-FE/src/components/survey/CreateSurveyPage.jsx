import { useEffect, useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSurvey, postNewSurvey } from "../../redux/action";
import { Navigate } from "react-router-dom";

const CreateSurveyPage = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const [newSurvey, setNewSurvey] = useState([
    {
      question: "",
      answers: [
        { answer: "", answerId: null },
        { answer: "", answerId: null },
      ],
      points: 1,
    },
  ]);
  const [status, setStatus] = useState(null); // null | "success" | "error"

  useEffect(() => {
    (async () => {
      const existing = await dispatch(getSurvey());
      if (existing && existing.length) setNewSurvey(existing);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (role !== "Admin") return <Navigate to="/error" />;

  const handleNewSurvey = async (e) => {
    e.preventDefault();
    const ok = await dispatch(postNewSurvey(newSurvey));
    setStatus(ok ? "success" : "error");
  };

  const updateQuestion = (idx, field, value) => {
    const copy = [...newSurvey];
    copy[idx][field] = value;
    setNewSurvey(copy);
  };

  const updateAnswer = (qIdx, aIdx, value) => {
    const copy = [...newSurvey];
    copy[qIdx].answers[aIdx].answer = value;
    setNewSurvey(copy);
  };

  return (
    <Container id="createContainer">
      <div className="card-create">
        <h1>Crea nuovo questionario</h1>

        {status === "success" && (
          <Alert variant="success">Questionario salvato!</Alert>
        )}
        {status === "error" && (
          <Alert variant="danger">
            Errore nel salvataggio del questionario.
          </Alert>
        )}

        <Form onSubmit={handleNewSurvey}>
          {newSurvey.map((q, idx) => (
            <div key={idx} className="question-block">
              <h5>Domanda {idx + 1}</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Testo della domanda"
                  required
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(idx, "question", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                {q.answers.map((ans, aIdx) => (
                  <Form.Control
                    key={aIdx}
                    className="mb-2"
                    type="text"
                    placeholder={`Risposta ${aIdx + 1}`}
                    required
                    value={ans.answer}
                    onChange={(e) => updateAnswer(idx, aIdx, e.target.value)}
                  />
                ))}
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="btn-add"
                    onClick={() => {
                      const copy = [...newSurvey];
                      copy[idx].answers.push({ answer: "", answerId: null });
                      setNewSurvey(copy);
                    }}
                  >
                    + Risposta
                  </Button>
                  {q.answers.length > 2 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="btn-remove"
                      onClick={() => {
                        const copy = [...newSurvey];
                        copy[idx].answers.pop();
                        setNewSurvey(copy);
                      }}
                    >
                      – Rimuovi risposta
                    </Button>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Punti per questa domanda</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  required
                  value={q.points}
                  onChange={(e) =>
                    updateQuestion(idx, "points", parseInt(e.target.value, 10))
                  }
                />
              </Form.Group>

              {newSurvey.length > 1 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    setNewSurvey((prev) => {
                      const copy = [...prev];
                      copy.splice(idx, 1);
                      return copy;
                    })
                  }
                >
                  Rimuovi domanda
                </Button>
              )}
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4 flex-wrap">
            <Button
              variant="outline-light"
              onClick={() =>
                setNewSurvey((prev) => [
                  ...prev,
                  {
                    question: "",
                    answers: [
                      { answer: "", answerId: null },
                      { answer: "", answerId: null },
                    ],
                    points: 1,
                  },
                ])
              }
            >
              + Aggiungi domanda
            </Button>
            <Button type="submit" variant="danger">
              Salva questionario
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreateSurveyPage;
