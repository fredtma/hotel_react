import { Form, InputGroup } from "react-bootstrap";
import { debounce } from "../../services/debounce/debounce";

export default function HotelSearchHeader({onSearch}) {
  const searchInputHandler = debounce((e) => { onSearch(e.target.value);}, 500);
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={searchInputHandler}
        />
      </InputGroup>
    </div>
  );
}