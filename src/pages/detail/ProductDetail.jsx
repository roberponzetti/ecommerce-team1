import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from '../../redux/state/product';
import { useProductById } from '../../hooks/useProductById';
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import { priceFormatted } from "../../utilities"
import { addQuantity, openCartNavbar } from '../../redux/state/cart';
import { useCounter } from '../../hooks/useCounter';
import { BsFillCartFill } from "react-icons/bs";
import { GoBack } from '../../components/goBack';
import style from "./style.module.css";
import clx from 'classnames';
import Counter from '../../components/counter/Counter';
import Loading from '../../components/loading/Loading';
import CustomButton from '../../components/button/CustomButton';
import useScroll from '../../hooks/useScroll';

const ProductDetail = () => {
  const { id } = useParams();
  const { isLoading } = useProductById(id);
  const { count, incrementAmount, decrementAmount } = useCounter();
  const { selectedProduct } = useSelector(selectProduct);
  const dispatch = useDispatch();

  const outStock = selectedProduct?.stock === 0 || count > selectedProduct?.stock;

  useScroll();

  const handleAdd = () => {
    dispatch(addQuantity({ id: selectedProduct.id, quantity: count, product: selectedProduct }));
    dispatch(openCartNavbar(true));
  }

  if (isLoading) return <Loading />

  return (
    <Fragment>
      {selectedProduct !== null ?
        <Container >
          <GoBack />
          <div className='d-flex justify-content-center align-items-center mt-5'>
            <Row className="d-flex justify-content-center align-items-center ">
              <Col
                lg={4}
              >
                <Image className={clx(style.object_fit, style.image_product)} src={selectedProduct.image !== "" ? selectedProduct.image : ""} height="300"></Image>
              </Col>
              <Col lg={7}>
                <h2 className={style.title_product}>{selectedProduct.title}</h2>
                <span className={style.price_formatted}>{priceFormatted(selectedProduct.price)}</span>
                <p className={style.short_description}>{selectedProduct.shortDescription}</p>
                <p className={style.large_description}>{selectedProduct.largeDescription}</p>
                <br />

                <div className='d-flex justify-content-center align-items-center mt-3'>
                  <CustomButton handle={handleAdd} outStock={outStock} >
                    <BsFillCartFill />
                    Agregar al carrito
                  </CustomButton>
                  <Counter
                    handleAddQuantity={incrementAmount}
                    handleSubtractQuantity={decrementAmount}
                    product={selectedProduct}
                    currentAmount={count}
                  />
                </div>
                <span className={clx('d-block mt-3', style.stock, { [style.error]: outStock, [style.success]: !outStock })}>
                  ( {selectedProduct.stock} disponibles )
                </span>
              </Col>
            </Row>
          </div>
        </Container>
        :
        <Row>
          <Col className='w-100 d-flex justify-content-center align-items-center'>
            <Alert className={clx(style.margin_top)} variant="danger">
              Se produjo un error al mostrar el producto seleccionado.
            </Alert>
          </Col>
        </Row>
      }
    </Fragment>
  )
}

export default ProductDetail
