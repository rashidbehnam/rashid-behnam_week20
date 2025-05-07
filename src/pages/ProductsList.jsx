import React from 'react'
import {useModal} from '../Context/ModalContext'
import ProductForm from '../components/ProductForm';

const ProductsList = () => {
    const {openModal,closeModal}=useModal();
  return (
    <>
        <div>ProductsList</div>
        <button onClick={()=>openModal('',<ProductForm closeModal={closeModal}/>)}>New Product</button>
    </>
  )
}

export default ProductsList