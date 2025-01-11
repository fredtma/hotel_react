import { ListGroup } from "react-bootstrap";
import { fetchOk } from "../../services/fetch/fetch.service";
import { useEffect, useState } from "react";

export default function HotelList() {
  const [items, setItems] = useState([]);
  useEffect(() => getItems(setItems).then(setItems.bind(null)), []);

  return (
    <div>
      <ListGroup>
        {items.map((item, i) => (
          <ListGroup.Item key={i}>
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

}


function getItems() {
  return fetch("/assets/data/properties.json")
    .then(fetchOk)
    .catch((err) => console.error(err));
};