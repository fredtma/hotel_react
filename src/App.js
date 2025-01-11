import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ErrorBoundary from './pages/error-boundary/error-boundary';
import HotelList from './pages/hotel-list/hotel-list';
import HotelSearchHeader from './pages/hotel-search-header/hotel-search-header';

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
          <ErrorBoundary>
            <HotelList search={search} />
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
