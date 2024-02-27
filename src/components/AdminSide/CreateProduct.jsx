import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, getProduct } from "../../redux/ProductSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './CreateProduct.module.css'
const CreateProduct = ({ toggleModal, categoryId }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [specifications, setSpecifications] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({
        images: "",
        name: "",
        price: "",
        discount: "",
        specifications: "",
        description: "",
    });
    console.log(categoryId);
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleCreateProduct = async (event) => {
        event.preventDefault();

        const newErrors = {
            name: !name ? "Please enter product name" : "",
            price: !price ? "Please enter price" : "",
            discount: !discount ? "Please enter discount" : "",
            specifications: !specifications ? "Please enter specifications" : "",
            description: !description ? "Please enter description" : "",
            images: images.length === 0 ? "Please select at least one image" : "",
        };

        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            return;
        }

        const newProduct = {
            name,
            price,
            discount,
            specifications,
            description,
            images,
            categoryId,
        };

        try {
            await dispatch(addProduct({ product: newProduct }));
            toggleModal();
            dispatch(getProduct({ categoryId }));
        } catch (error) {
            console.error("Failed to add product:", error);
        }

        // Reset form fields and errors
        setName("");
        setPrice("");
        setDiscount("");
        setSpecifications("");
        setDescription("");
        setImages([]);
        setErrors({
            images: "",
            name: "",
            price: "",
            discount: "",
            specifications: "",
            description: "",
        });
    };

    return (
        <div>
            <div className="overlay"></div>
            <div className="modal-content">
                <form className="creatCategory" onSubmit={handleCreateProduct}>
                    <h2>Create Product</h2>
                    <div className="title">
                        <h5>Add Product Image:</h5>
                        <input type="file" multiple onChange={handleImageChange} />

                        {errors.images && <div className="error">{errors.images}</div>}
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
                        {errors.name && <div className="error">{errors.name}</div>}
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
                        {errors.price && <div className="error">{errors.price}</div>}
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
                        {errors.discount && <div className="error">{errors.discount}</div>}
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
                        {errors.specifications && (
                            <div className="error">{errors.specifications}</div>
                        )}
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
                        {errors.description && (
                            <div className="error">{errors.description}</div>
                        )}
                    </div>
                    <div className="buttons">
                        <button type="submit" className="add_button">
                            Add
                        </button>
                        <button className="cancel_btn" onClick={toggleModal}>Cancel</button>
                    </div>
                </form>
                <button className="close-modal" onClick={toggleModal}>
                    <div className="x"><FontAwesomeIcon icon={faXmark} /></div>
                </button>
            </div>
        </div>
    );
};

export default CreateProduct;
