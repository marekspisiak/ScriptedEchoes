import { Navbar, Nav, ListGroup } from "react-bootstrap";

function Sidebar({ categories }) {
  return (
    <div className="sidebar">
      <Navbar
        bg="light"
        expand="lg"
        className="justify-content-center flex-column"
      >
        <Navbar.Brand>Kategórie</Navbar.Brand>
        <Navbar.Toggle aria-controls="sidebar-nav" className="mb-2" />
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column justify-content-center w-100">
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item key={index}>{category}</ListGroup.Item>
              ))}
            </ListGroup>
            {/* ... môžete pridať ďalšie prvky, napr. zoznam najnovších článkov, odkazy na sociálne médiá, atď. */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Sidebar;
