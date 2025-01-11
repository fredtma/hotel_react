import { useEffect, useMemo, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { fetchOk } from "../../services/fetch/fetch.service";
import { receiveMessage, sendMessage, setupWorker } from "../../services/web-worker/web-worker";

let worker = setupWorker();
export default function HotelList({ search = "" }) {
  const [items, setItems] = useState([]);
  const filterItems = useMemo( () => searchItems(items, search), [search, items]);
  useEffect(() => { getItems().then(setItems.bind(null)); }, []);
  useEffect(() => {
    worker ??= setupWorker();
    return () => {
      //worker.terminate();
    };
  }, []);

  return (
    <Card>
      <Card.Header>Hotel List</Card.Header>
      <ListGroup as="ul">
        {filterItems.map((item, i) => (
          <ListGroup.Item
            key={item.id}
            as="li"
            variant={i % 2 === 0 ? "light" : "primary"}
            className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.description}
            </div>
            <Badge bg="primary">Bathrooms {item.bathrooms}</Badge>
          </ListGroup.Item>
        ))}
        {filterItems.length === 0 && (
          <ListGroup.Item as="li">No results</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

function getItems() {
  return fetch("/assets/data/properties.json")
    .then(fetchOk)
    .catch((err) => console.error(err));
}

function searchItems(items, search, w = worker) {
  sendMessage({ type: "search", body: search }, w);
  receiveMessage(w, (e) => console.log('Received message', e.data));
  return items.filter(
    (item) =>
      searchValue(item.name, search) || searchValue(item.description, search)
  );
}

function searchValue(value, search) {
  return value.toLowerCase().includes(search.toLowerCase());
}
