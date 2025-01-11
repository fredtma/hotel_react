import 'bootstrap/dist/css/bootstrap.min.css';
import HotelList from './pages/hotel-list/hotel-list';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={2}>
          <h2>Sidebar</h2>
          <p>Some sidebar content here.</p>
        </Col>
        <Col xs={12} md={10}>
          <h1>Hotel Listing</h1>
          <HotelList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
