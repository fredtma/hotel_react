import { Form, InputGroup } from "react-bootstrap";

export default function HotelSearchHeader() {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  );
}