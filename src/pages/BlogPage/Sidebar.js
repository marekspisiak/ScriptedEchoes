import { Navbar, Nav, ListGroup } from "react-bootstrap";

function Sidebar({ categories }) {
  return (
    <div className="sidebar mb-3">
      <Navbar expand="lg" className="flex-column">
        <Navbar.Text className="font-weight-bold mb-2">Kategórie</Navbar.Text>
        <Navbar.Toggle
          aria-controls="sidebar-nav"
          className="mb-2"
        ></Navbar.Toggle>
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item key={index}>{category}</ListGroup.Item>
              ))}
            </ListGroup>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Sidebar;
