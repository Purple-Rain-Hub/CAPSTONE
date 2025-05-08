import { Carousel, Card, Row, Col, Container } from "react-bootstrap";

const GamesCarousel = ({ games, itemsToShow }) => {
  const gap = 16;
  const pages = [];
  for (let i = 0; i < games.length; i += itemsToShow) {
    pages.push(games.slice(i, i + itemsToShow));
  }

  return (
    <Container fluid className="p-0">
      <Carousel controls indicators={false} variant="dark">
        {pages.map((page, idx) => (
          <Carousel.Item key={idx}>
            <Row className="gx-3 px-3 justify-content-center">
              {page.map((g) => (
                <Col
                  key={g.id}
                  xs={6}
                  sm={4}
                  md={Math.floor(12 / itemsToShow)}
                  className="d-flex justify-content-center"
                >
                  <div className="carousel-card-no-title">
                    <img
                      src={g.cover}
                      alt={g.name}
                      className="carousel-img-no-title"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default GamesCarousel;
