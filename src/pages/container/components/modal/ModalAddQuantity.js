import React, { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import clx from 'classnames';
import CustomButton from '../../../../components/button/CustomButton';
import Counter from '../../../../components/counter/Counter';
import { useCounter } from '../../../../hooks/useCounter';
import { addQuantity, openCartNavbar } from '../../../../redux/state/cart';
import { BsFillCartFill } from "react-icons/bs";
import style from "./style.module.css";
import { priceFormatted } from '../../../../utilities';


const ModalAddQuantity = ({ showModal, handleOpenModal, product, setShowModal }) => {

  const dispatch = useDispatch();
  const { count, incrementAmount, decrementAmount, setCount } = useCounter();

  const outStock = product?.stock === 0 || count > product?.stock;

  const handleAddToCart = () => {
    dispatch(addQuantity({ id: product.id, quantity: count, product: product }));
    dispatch(openCartNavbar(true));
    setCount(1);
    setShowModal(false)

  };

  return (
    <Fragment>
      <Modal
        size="md"
        centered
        show={showModal}
        onHide={handleOpenModal}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm" >
            Agregar cantidad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center flex-column align-items-center'>
          <h4 className='my-3'>{priceFormatted(product?.price)}</h4>
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <CustomButton handle={handleAddToCart} outStock={outStock} >
              <BsFillCartFill />
              Agregar al carrito
            </CustomButton>
            <Counter
              handleAddQuantity={incrementAmount}
              handleSubtractQuantity={decrementAmount}
              product={product}
              currentAmount={count}
            />
          </div>
          <span className={clx('d-block mt-4', style.stock, { [style.error]: outStock, [style.success]: !outStock })}>( {product?.stock} disponibles )</span>
        </Modal.Body>
      </Modal>

    </Fragment>
  );
}

export default ModalAddQuantity
