import React, { useEffect, useState } from 'react';
import "./ProductProfile.css";
import { useDispatch } from 'react-redux';
import { getProduct, getProductbyId } from '../../redux/ProductSlice';
import { useLocation } from 'react-router-dom';

const ProductsProfile = () => {
    const dispatch = useDispatch();
    const { productName, productPrice, productDiscount, productSpecifications, productDescription, productImages } = useLocation().state;
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        dispatch(getProduct());
        
        if (productImages && productImages.length > 0) {
            setPreviewImage(productImages[0]);
        }
    }, [dispatch, productImages]);

    const handlePreview = (image) => {
        setPreviewImage(image);
    };

    return (
        <div className='product_profile'>
            <div className='image-content'>
                <div className='thumbnailer'>
                {productImages && productImages.map((image, index) => (
                    <img 
                        key={index}
                        src={`http://localhost:5001/images/${image}`}
                        alt={`Product ${index}`}
                        className="thumbnail"
                        onClick={() => handlePreview(image)} 
                    />
                ))}
               </div>
                {previewImage && (
                    <div className="preview-box">
                        <img
                            src={`http://localhost:5001/images/${previewImage}`}
                            alt="Preview"
                            className="preview-image"
                        />
                    </div>
                )}
                
            </div>
            <div className='details-content'>
                <h4>{productName}</h4>
                <div>
                    <h2>{productPrice}</h2><span>{productDiscount} </span>
                </div>
                <h5>{productSpecifications}</h5>
                <p>{productDescription}</p>
                <button>Add to Cart</button>
            </div>
            
        </div>
    );
};

export default ProductsProfile;
