import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSurvey, postNewSurvey } from "../redux/action";

const CreateSurveyPage = () => {
  const dispatch = useDispatch();
  const [newSurvey, setNewSurvey] = useState([
    {
      question: "",
      answers: [
        {
          answer: "",
          answerId: null,
        },
        {
          answer: "",
          answerId: null,
        },
      ],
      points: 1,
    },
  ]);
  const [isSaved, setIsSaved] = useState(null);

  const handleNewSurvey = async (e) => {
    e.preventDefault();
    const success = await dispatch(postNewSurvey(newSurvey));
    if (success) {
      setIsSaved(true);
    } else setIsSaved(false);
  };

  const fetchSurvey = async () => {
    const existingSurvey = await dispatch(getSurvey());
    if (existingSurvey != null && existingSurvey.length > 0) {
      setNewSurvey(existingSurvey);
    }
  };

  useEffect(() => {
    fetchSurvey();
  }, []);

  useEffect(() => {
    if (isSaved !== null) {
      const id = setTimeout(() => setIsSaved(null), 6000);
      return () => clearTimeout(id);
    }
  }, [isSaved]);

  return (
    <Container>
      <h1>Crea nuovo questionario</h1>
      {isSaved === null ? (
        <span className="d-none"></span>
      ) : isSaved ? (
        <span className="bg-primary text-white p-2">Questionario salvato</span>
      ) : (
        <span className="bg-danger p-2">
          Errore nel salvataggio del questionario
        </span>
      )}

      <Form onSubmit={handleNewSurvey}>
        {newSurvey.map((q, x) => (
          <div key={x} className="border border-1 border-dark-subtle p-3 mt-2">
            <div>
              <Form.Label className="mt-2 fw-lighter">
                Domanda n.{x + 1}
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={q.question}
                onChange={(e) => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey[x].question = e.target.value;
                  setNewSurvey(updatedSurvey);
                }}
              />
            </div>
            <div>
              <Form.Label className="mt-2 fw-lighter">Risposte</Form.Label>
              {newSurvey[x].answers.map((a, n) => (
                <Form.Control
                  key={n}
                  className="mt-2"
                  type="text"
                  required
                  placeholder={`risposta n.${n + 1}`}
                  value={a.answer}
                  onChange={(e) => {
                    const updatedSurvey = [...newSurvey];
                    updatedSurvey[x].answers[n].answer = e.target.value;
                    setNewSurvey(updatedSurvey);
                  }}
                />
              ))}
              <Button
                type="button"
                onClick={() => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey[x].answers.push({ answer: "", answerId: null });
                  setNewSurvey(updatedSurvey);
                }}
              >
                Aggiungi risposta
              </Button>
              {newSurvey[x].answers.length > 2 ? (
                <Button
                  type="button"
                  onClick={() => {
                    const updatedSurvey = [...newSurvey];
                    updatedSurvey[x].answers.pop();
                    setNewSurvey(updatedSurvey);
                  }}
                  className="btn-danger"
                >
                  Rimuovi risposta
                </Button>
              ) : (
                <p className="d-none"></p>
              )}
            </div>
            <div>
              <Form.Label className="mt-2 fw-lighter">Punti</Form.Label>
              <Form.Control
                type="number"
                required
                value={q.points}
                onChange={(e) => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey[x].points = parseInt(e.target.value, 10) || 0;
                  setNewSurvey(updatedSurvey);
                }}
              />
            </div>
            {newSurvey.length > 1 ? (
              <Button
                type="button"
                onClick={() => {
                  const updatedSurvey = [...newSurvey];
                  updatedSurvey.splice(x, 1);
                  setNewSurvey(updatedSurvey);
                }}
                className="btn-danger"
              >
                Rimuovi domanda
              </Button>
            ) : (
              <p className="d-none"></p>
            )}
          </div>
        ))}
        <Button
          type="button"
          className="mt-2 d-block"
          onClick={() => {
            const updatedSurvey = [...newSurvey];
            updatedSurvey.push({
              question: "",
              answers: [
                {
                  answer: "",
                  answerId: null,
                },
                {
                  answer: "",
                  answerId: null,
                },
              ],
              points: 1,
            });
            setNewSurvey(updatedSurvey);
          }}
        >
          Aggiungi domanda
        </Button>
        <Button type="submit" className="mt-4 d-block btn-danger">
          Salva Form
        </Button>
      </Form>
    </Container>
  );
};

export default CreateSurveyPage;
