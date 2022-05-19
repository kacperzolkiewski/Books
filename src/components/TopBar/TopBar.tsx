import { Link } from "react-router-dom";

interface Props {
  showChange: Function;
}

export const TopBar: React.FC<Props> = ({ showChange }) => {
  return (
    <div className="topbar">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/favourite">
        Favourite
      </Link>
      <Link className="link" to="/search">
        Search
      </Link>
      <span onClick={() => showChange()} className="link">
        Filtr
      </span>
    </div>
  );
};
