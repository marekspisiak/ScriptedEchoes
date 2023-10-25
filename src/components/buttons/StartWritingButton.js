import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function StartWritingButton() {
  return (
    <Link to="/register">
      <Button className="start-writing-button" variant="primary" size="lg">
        Začnite písať
      </Button>
    </Link>
  );
}

export default StartWritingButton;
