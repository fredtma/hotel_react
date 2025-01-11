import { useEffect, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { receiveMessage, sendMessage, setupWorker } from "../../services/web-worker/web-worker";

let worker = setupWorker();
export default function HotelList({ search = "" }) {
  const [items, setItems] = useState([]);
  useEffect(() => searchItems(search, worker), [search]);

  useEffect(() => {
    worker = setupWorker();
    worker.workerIsSet = true;
    receiveMessage(worker, (e) => {
      console.log(worker.workerIsSet);
      const result = e.data;
      if (result?.size) {
        setItems(Array.from(result));
      }
    });
    sendMessage({ type: "all:products" }, worker);
    return () => {
      worker.terminate();
      worker = null;
    };
  }, []);

  return (
    <Card>
      <Card.Header>Hotel List</Card.Header>
      <ListGroup as="ul">
        {items.map((item, i) => (
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
        {items.length === 0 && (
          <ListGroup.Item as="li">No results</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

function searchItems(search, w = worker) {
  if (!w?.workerIsSet) return;
  if (search) {
    sendMessage({ type: "search:products", body: search }, w);
  } else {
    sendMessage({ type: "all:products" }, w);
  }
}
