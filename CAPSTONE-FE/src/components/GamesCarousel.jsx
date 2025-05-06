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
            <div
              className="d-flex justify-content-center px-3"
              style={{ gap: `${gap}px` }}
            >
              {page.map((g) => (
                <div
                  key={g.id}
                  className="carousel-card-no-title"
                  style={{
                    flex: `0 0 calc((100% - ${(page.length - 1) * gap}px) / ${
                      page.length
                    })`,
                  }}
                >
                  <img
                    src={g.cover}
                    alt={g.name}
                    className="carousel-img-no-title"
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default GamesCarousel;
