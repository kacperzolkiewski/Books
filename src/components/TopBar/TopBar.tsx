import { Link } from "react-router-dom";

interface Props {
  showChange: Function;
}

export const TopBar: React.FC<Props> = ({ showChange }) => {
  return (
    <div className="topbar">
      <Link className="link" to="/Books">
        Home
      </Link>
      <Link className="link" to="/Books/favourite">
        Favourite
      </Link>
      <Link className="link" to="/Books/search">
        Search
      </Link>
      <span onClick={() => showChange()} className="link">
        Filtr
      </span>
    </div>
  );
};
