import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { openCartNavbar, selectCart } from "../../redux/state/cart";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiLogInCircle } from "react-icons/bi";
import CartNavbar from "../cart/CartNavbar";
import clx from "classnames";
import style from "./style.module.css";
import globalStyle from "../../global-style/style.module.css"
import { priceFormatted, totalPrice } from "../../utilities";
import { logoutUser, selectAuth } from "../../redux/state/auth";
import { FaUser } from "react-icons/fa";

const NavbarItem = () => {
  const dispatch = useDispatch()
  const { cart, openCart } = useSelector(selectCart);
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((prevValue, currentValue) => prevValue + currentValue.quantity, 0);

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  const handleLogin = () => {
    navigate("/login");
  }

  const handleBoxToggle = () => {
    dispatch(openCartNavbar(true))
  }

  const handleBoxLeaveToggle = () => {
    dispatch(openCartNavbar(false))
  }

  return (
    <Navbar variant="dark" className={style.navBar} expand="lg">
      <Container>
        {openCart && <div className={style.overlay}></div>}
        <div className="d-flex justify-content-center align-items-center">
          <Link className={clx(style.brand, "d-flex align-items-center")} to="/">
            <AiOutlineHome className={globalStyle.mr_1} />
            Inicio
          </Link>
          <div className="d-flex align-items-center text-white ">
            <FaUser className='me-3' size={20} />
            <div>
              <NavDropdown
                title={user?.displayName ? user.displayName : user?.email}
                className={style.name_user}
              >
                {user ?
                  <NavDropdown.Item className="p-0">
                    <Button className={clx(style.item_nav, "text-dark", "border-0")} onClick={handleLogout} variant="outline-light">
                      <RiLogoutCircleLine className={globalStyle.mr_1} />
                      Cerrar sesi??n
                    </Button>
                  </NavDropdown.Item>
                  :
                  <NavDropdown.Item>
                    <Button className={clx(style.item_nav, "text-dark", "border-0")} onClick={handleLogin} variant="outline-light">
                      <BiLogInCircle className={globalStyle.mr_1} />
                      Iniciar sesi??n
                    </Button>
                  </NavDropdown.Item>
                }
              </NavDropdown>

            </div>
          </div>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-na" />

        <Navbar.Collapse id="basic-navbar-na" className="text-white justify-content-end">
          <div className="my-3 d-flex ">
            <Link className={clx(style.item_nav)} onMouseOver={handleBoxToggle} to="/cart">
              <AiOutlineShoppingCart className={globalStyle.mr_1} size={25} />
              <span className={clx(style.badge, "rounded-pill", "badge-notification")}>
                {totalQuantity}
              </span>
            </Link>
            <span>{priceFormatted(totalPrice(cart))}</span>
          </div>

        </Navbar.Collapse>

        {openCart && <CartNavbar handleBoxLeaveToggle={handleBoxLeaveToggle} />}
      </Container>
    </Navbar >
  );
};

export default NavbarItem;
