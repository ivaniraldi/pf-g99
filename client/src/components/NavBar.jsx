import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { CartContext } from "../context/CartContext";

export default function NavBar() {
  const { logout, user } = useContext(GlobalContext);
  const { totalItemsPrice } = useContext(CartContext);
  // solucion para que no de NaN
  const cartTotal = totalItemsPrice || 0;
  return (
    <Navbar expand="lg" className="glass sticky-top" style={{
      marginBottom: '30px',
      padding: '12px 0',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="font-archivo-black" style={{
          fontSize: '1.8rem',
          color: 'var(--text-main)',
          letterSpacing: '-1px'
        }}>
          ADL<span style={{ color: 'var(--primary)', fontSize: '1.6rem' }}>SHIRTS</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-lg-5 gap-3">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/gallery" className="nav-link-custom">Productos</Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-4">
            {user ? (
              <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                Mi Perfil
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/auth" className="nav-link-custom">
                Ingresar
              </Nav.Link>
            )}

            {user && user.role === "admin" && (
              <Nav.Link as={Link} to="/admin" className="nav-link-custom fw-bold" style={{ color: 'var(--accent)' }}>
                Admin
              </Nav.Link>
            )}

            {user && (
              <button
                onClick={logout}
                className="btn btn-link nav-link-custom p-0 text-decoration-none"
                style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}
              >
                Salir
              </button>
            )}

            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex align-items-center gap-2"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '10px 22px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '0.95rem',
                boxShadow: '0 8px 15px rgba(99, 102, 241, 0.25)',
                transition: 'var(--transition)',
                textDecoration: 'none'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              <span style={{ borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '10px' }}>
                ${cartTotal.toFixed(2)}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .nav-link-custom {
          color: var(--text-main) !important;
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition);
          position: relative;
        }
        .nav-link-custom:hover {
          color: var(--primary) !important;
        }
        .nav-link-custom::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--primary);
          transition: var(--transition);
        }
        .nav-link-custom:hover::after {
          width: 100%;
        }
      `}</style>
    </Navbar>
  );
}
