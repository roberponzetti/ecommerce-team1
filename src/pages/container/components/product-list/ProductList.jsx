import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../../redux/state/product";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../../redux/state/product";
import classNames from "classnames";
import style from "./style.module.css";

const ProductList = () => {
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product));
  };

  return (
    <Container>
      <Row className="mt-5">
        {products.map((product, index) => (
          <Col
            xs={12}
            md={4}
            lg={3}
            key={index}
            className="mt-5 position-relative"
          >
            <Card className={classNames('p-5', style.container__card)}>
              <div className={style.bg_overlay}></div>
              <Card.Img
                variant="top"
                src={product.image !== "" ? product.image : ""}
                className={classNames(style.heightImage, style.fit_contain)}
              />
              <Card.Body>
                <Card.Title className={style.fontSize_titleCard}>
                  {product.title}
                </Card.Title>
                <Card.Text>{product.shortDescription}</Card.Text>
              </Card.Body>
              <div className={classNames('position-absolute', style.container_buttons)}>
                <Link to={`/detail/${product.id}`}>
                  <Button variant="outline-light" className="mx-2">
                    Detalle
                  </Button>
                </Link>

                <Button variant="outline-light" onClick={() => handleAddToCart(product)}>Agregar</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
