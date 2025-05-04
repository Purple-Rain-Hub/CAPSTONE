import { Carousel, Card, Row, Col, Container } from "react-bootstrap";

const GamesCarousel = ({ title, games, itemsToShow }) => {
  const pages = [];
  for (let i = 0; i < games.length; i += itemsToShow) {
    pages.push(games.slice(i, i + itemsToShow));
  }

  return (
    <Container fluid className="my-4">
      <h3 className="mb-3">{title}</h3>
      <Carousel controls indicators={false}>
        {pages.map((page, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-flex flex-row flex-nowrap"
              style={{ overflowX: "auto", padding: "0 1rem" }}
            >
              {page.map((g) => (
                <Card
                  key={g.id}
                  className="me-3"
                  style={{ minWidth: "200px", maxWidth: "200px" }}
                >
                  {g.cover && (
                    <Card.Img
                      variant="top"
                      src={g.cover}
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="fs-6 text-truncate">
                      {g.name}
                    </Card.Title>
                    {g.summary && (
                      <Card.Text className="text-truncate">
                        {g.summary}
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default GamesCarousel;
