import "./Admin.css"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory, getCategory, getCategorybyId, setIsgetCategory } from '../../redux/slice';

import '../../components/Modal.css'
import CreateCategory from "./CreateCategory";
import DeleteModal from "./DeleteModal";
import EditCategory from "./EditCategory";
import {  useNavigate } from "react-router-dom";
import "./Category.css"

const Category = () => {
    const [modal, setModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.item.items);
    const [editModalMap, setEditModalMap] = useState({});
    const navigate = useNavigate();
    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const viewDetails = async (id) => {
        await dispatch(getCategorybyId(id));
        setEditModalMap({ ...editModalMap, [id]: true });
    };

    const handleEdit = (id) => {
        viewDetails(id);



    };
    const handleProduct =(categoryId) =>{
        navigate('/admin/product', {state: {categoryId}})
    }

    const handleCloseModal = (id) => {
        setEditModalMap({ ...editModalMap, [id]: false });
    };

    const removeCategory = async (id) => {
        await dispatch(deleteCategory(id));
        dispatch(getCategory());
    };

    const handleDeleteConfirmation = () => {
        removeCategory(categoryToDelete);
        setDeleteConfirmation(false);
    };

    const handleDelete = (id) => {
        setCategoryToDelete(id);
        setDeleteConfirmation(true);
    };

    return (
        <div className='category'>
            <h3>CATEGORY</h3>

            <div className="create-btn">
                <button className="creating" onClick={toggleModal}>Create</button>
                {modal && <CreateCategory toggleModal={toggleModal} />}
            </div>

            <div className='categoryContent'>
                {items && items.map((category, index) => (
                      <div className='category-box' key={index}>
                         <button className="Product_Btn" onClick={() => handleProduct(category._id)}  >   <div className='img-box'>
                            <img className="image" src={`http://localhost:5001/images/${category.categoryImg}`} alt="" />
                        </div></button> 
                            <h5>{category.categoryName}</h5>
                            <p>{category.description}</p>
                            <div>
                                <button className="edit-btn" onClick={() => handleEdit(category._id)}>edit</button>
                                {editModalMap[category._id] && (
                                    <div className="moda">
                                        <div className="overla"></div>
                                        <div className="modal-content">
                                            <EditCategory category={category} closeModal={() => handleCloseModal(category._id)} />
                                            <button className="close-modal" onClick={() => handleCloseModal(category._id)}>
                                                <div className="x">x</div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <button className="delete-btn" onClick={() => handleDelete(category._id)}>delete</button>
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

export default Category;
