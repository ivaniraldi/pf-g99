import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { CartContext } from "../context/CartContext";

export default function NavBar() {
  const { logout, user } = useContext(GlobalContext);
  const { cartItems } = useContext(CartContext);
  
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const cartTotal = total || 0;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ADLShirts
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Productos</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
                <Nav.Link as={Link} to="/profile">
                    Mi Cuenta
                </Nav.Link>
            ) : (
                <Nav.Link as={Link} to="/auth">
                    Iniciar Sesión
                </Nav.Link>
            )}
            {user && user.role === "admin" && (
                <Nav.Link as={Link} to="/admin">
                    Admin
                </Nav.Link>
            )}
            {user && (
                <Nav.Link as={Link} to="/" onClick={logout}>
                    Cerrar Sesión
                </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart" className="btn btn-secondary">
                🛒 ${cartTotal.toLocaleString()}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
