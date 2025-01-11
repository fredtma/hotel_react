import 'bootstrap/dist/css/bootstrap.min.css';
import HotelList from './pages/hotel-list/hotel-list';
import HotelSearchHeader from './pages/hotel-search-header/hotel-search-header';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  return (
    <Container>
      <Row>
        <Col xs={6} md={2}>
          <h2>Sidebar</h2>
          <p>Some sidebar content here.</p>
        </Col>
        <Col xs={12} md={10}>
          <h2>Hotel Listing</h2>
          <HotelSearchHeader onSearch={setSearch} />
          <HotelList search={search} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
