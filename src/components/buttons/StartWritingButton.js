import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function StartWritingButton() {
  return (
    <Link to="/create">
      <Button variant="start-writing" size="lg">
        Začnite písať
      </Button>
    </Link>
  );
}

export default StartWritingButton;
