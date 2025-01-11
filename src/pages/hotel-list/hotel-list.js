export default function HotelList() {
  const items = ['China', 'Brazil', 'USA', 'Congo'];
  return (
    <div>
      <ul className="list-group">
        {items.map((item, i) => (
          <li className="list-group-item" key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}