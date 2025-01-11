import { Badge, Card, ListGroup } from "react-bootstrap";
import { fetchOk } from "../../services/fetch/fetch.service";
import { useEffect, useState } from "react";

export default function HotelList() {
  const [items, setItems] = useState([]);
  useEffect(() => { getItems().then(setItems.bind(null)); }, []);

  return (
    <Card>
      <Card.Header>Hotel List</Card.Header>
      <ListGroup as="ul">
        {items.map((item, i) => (
          <ListGroup.Item
            key={i}
            as="li"
            variant={i % 2 === 0 ? 'light' : 'primary'}
            className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.description}
            </div>
            <Badge bg="primary">Bathrooms {item.bathrooms}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );

}


function getItems() {
  return fetch("/assets/data/properties.json")
    .then(fetchOk)
    .catch((err) => console.error(err));
};