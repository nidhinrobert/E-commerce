import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProduct, getProductbyId, setIsgetProduct } from '../../redux/ProductSlice';
import '../../components/Modal.css';
import CreateProduct from "./CreateProduct";
import DeleteModal from "./DeleteModal";
import { useLocation } from "react-router-dom";
import "./Product.css";
import "./productlisting.css"
import EditProduct from './EditProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const ProductListing = () => {
    const [modal, setModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const dispatch = useDispatch();
    const productItems = useSelector((state) => state.productItem.productItems);
    const [editModalMap, setEditModalMap] = useState({});
    const location= useLocation();
    
    const categoryId = location.state.categoryId;
    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        dispatch(getProduct({categoryId}));
    }, [dispatch,categoryId]);

    const viewDetails = async (id) => {
        setEditModalMap({ ...editModalMap, [id]: true });
    };

    const handleEdit = (id) => {
        viewDetails(id);
    };
    
    const handleCloseModal = (id) => {
        setEditModalMap({ ...editModalMap, [id]: false });
    };

    const removeProduct = async (id) => {
        await dispatch(deleteProduct(id));
        dispatch(getProduct({categoryId}));
    };

    const handleDeleteConfirmation = () => {
        removeProduct(productToDelete);
        setDeleteConfirmation(false);
    };

    const handleDelete = (id) => {
        setProductToDelete(id);
        setDeleteConfirmation(true);
    };

    const calculateDiscountedPrice = (price, discount) => {
        if (!price || !discount) return '';
        const discountedPrice = price - (price * discount / 100);
        return discountedPrice.toFixed(2);
        
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(amount);
      };
    

    return (
        <div className='product'>
            <h3>Products</h3>

            <div className="create-btn">
                <button className="creating" onClick={toggleModal}>Create</button>
                {modal && <CreateProduct toggleModal={toggleModal} categoryId={categoryId}  />}
            </div>

            <div className='productContent'>
                {Array.isArray(productItems) && productItems?.map((product, index) => (
                    <div className='product-box' key={index}>
                        <div className="image-slider">
                          
                              <img className="product-image" src={`http://localhost:5001/images/${product.images[0]}`} alt="" />
                            
                        </div>
                        <h5>{product.name}</h5>
      <div className="price-wrapper">
        <span className="price-label">Price:</span>
        <span className="price">{formatCurrency(product.price)}</span>
        <span className="discount-label"> Off:</span>
        <span className="discount">{product.discount}%</span>
      </div>
      <h6 className="specifications">Specifications: {product.specifications}</h6>
      <p className="description">{product.description}</p>
      <h6 className="discounted-price">
        Discounted Price: <span className="price">{formatCurrency(calculateDiscountedPrice(Number(product.price), Number(product.discount)))}</span>
      </h6>
                        <div>
                            <button className="edit-btn" onClick={() => handleEdit(product._id)}>edit</button>
                            {editModalMap[product._id] && (
                                    <div className="moda">
                                        <div className="overla"></div>
                                        <div className="modal-content">
                                            <EditProduct product={product} categoryId={categoryId} closeModal={(closeModal) => handleCloseModal(product._id)} />
                                            <button className="close-modal" onClick={() => handleCloseModal(product._id)}>
                                                <div className="x"><FontAwesomeIcon icon={faXmark} /></div>
                                            </button>
                                        </div>
                                    </div> 
                            )}
                            <button className="delete-btn" onClick={() => handleDelete(product._id)}>delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <DeleteModal
                isOpen={deleteConfirmation}
                onCancel={() => setDeleteConfirmation(false)}
                onConfirm={handleDeleteConfirmation}
            />
        </div>
    );
};

export default ProductListing;
