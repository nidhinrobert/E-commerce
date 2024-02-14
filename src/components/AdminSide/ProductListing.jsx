
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProduct, getProductbyId, setIsgetProduct } from '../../redux/ProductSlice';
import '../../components/Modal.css'
import CreateProduct from "./CreateProduct";
import DeleteModal from "./DeleteModal";
import { useLocation } from "react-router-dom";
import "./Product.css"
import EditProduct from './EditProduct';

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
        // await dispatch(getProductbyId(id));
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
        dispatch(getProduct({categoryId}))
    };

    const handleDeleteConfirmation = () => {
        removeProduct(productToDelete);
        setDeleteConfirmation(false);
    };

    const handleDelete = (id) => {
        setProductToDelete(id);
        setDeleteConfirmation(true);
    };

    return (
        <div className='product'>
            <h3>Products</h3>

            <div className="create-btn">
                <button className="creating" onClick={toggleModal}>Create</button>
                {modal && <CreateProduct toggleModal={toggleModal} categoryId={categoryId}  />}
            </div>

            <div className='productContent'>
                {Array.isArray(  productItems) && productItems?.map((product, index) => (
                    <div className='product-box' key={index}>
                        <button className="Product_Btn"  >   <div className='img-box'>
                        {product.images.map((image, imageIndex) => (
                    <img key={imageIndex} className="image" src={`http://localhost:5001/images/${image}`} alt="" />
                ))}
                        </div></button>
                        <h5>{product.name}</h5>
                        <h6>{product.price}</h6>
                        <h6>{product.discount}</h6>
                        <h6>{product.specifications}</h6>
                        <p>{product.description}</p>
                        <div>
                            <button className="edit-btn"onClick={() => handleEdit(product._id)} >edit</button>
                            {editModalMap[product._id] && (
                                    <div className="moda">
                                        <div className="overla"></div>
                                        <div className="modal-content">
                                            <EditProduct product={product} categoryId={categoryId}closeModal={(closeModal) => handleCloseModal(product._id)} />
                                            <button className="close-modal" onClick={() => handleCloseModal(product._id)} >
                                                <div className="x">x</div>
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
