import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProduct, getProductbyId } from '../../redux/ProductSlice';


const EditProduct = ({ product, closeModal,categoryId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [specifications, setSpecifications] = useState(product.specifications);
  const [images, setImages] = useState(product.images);
  const [description, setDescription] = useState(product.description);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setImages(files);
  };

  const updateSubmit = async (id) => {
    if (!name || !price || !discount || !specifications || !description) {
        setError('Please fill in all fields');
        return;
    }

    const newData = {
        id, 
        name,
        price,
        discount,
        specifications,
        description,
        images,
        categoryId,
    };

    dispatch(editProduct(newData));

    closeModal();
    
};
  return (
    <div>
         <form className='CategoryForm' onSubmit={(e) => {
          e.preventDefault();
          updateSubmit(product._id);
        }} >
                <h2>Edit Product</h2>
                <div className="title">
                        <h5>Add Product Image:</h5>
                        <input type="file" multiple onChange={handleImageChange} />

                        {/* {errors.images && <div className="error">{errors.images}</div>} */}
                    </div>
                    <div className="title">
                        <h5>Product Name:</h5>
                        <input
                            type="text"
                            placeholder="Enter product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                        />
                        {/* {errors.name && <div className="error">{errors.name}</div>} */}
                    </div>
                    <div className="title">
                        <h5>Price:</h5>
                        <input
                            type="text"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="price"
                        />
                        {/* {errors.price && <div className="error">{errors.price}</div>} */}
                    </div>
                    <div className="title">
                        <h5>Discount:</h5>
                        <input
                            type="text"
                            placeholder="Enter discount"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            id="discount"
                        />
                        {/* {errors.discount && <div className="error">{errors.discount}</div>} */}
                    </div>
                    <div className="title">
                        <h5>Specifications:</h5>
                        <input
                            type="text"
                            placeholder="Enter specifications"
                            value={specifications}
                            onChange={(e) => setSpecifications(e.target.value)}
                            id="specifications"
                        />
                        {/* {errors.specifications && (
                            <div className="error">{errors.specifications}</div>
                        )} */}
                    </div>
                    <div className="title">
                        <h5>description:</h5>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                        />
                        {/* {errors.description && (
                            <div className="error">{errors.description}</div>
                        )} */}
                    </div>

               
                

                <div>
                    <button type='submit'  >Edit </button>
                </div>
            </form>

    </div>
  )
}

export default EditProduct