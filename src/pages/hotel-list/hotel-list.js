import { Card, ListGroup } from "react-bootstrap";
import { fetchOk } from "../../services/fetch/fetch.service";
import { useEffect, useState } from "react";

export default function HotelList() {
  const [items, setItems] = useState([]);
  useEffect(() => { getItems().then(setItems.bind(null)); }, []);

  return (
    <Card>
      <Card.Header>Hotel List</Card.Header>
      <ListGroup>
        {items.map((item, i) => (
          <ListGroup.Item key={i}>
            {item.name}
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