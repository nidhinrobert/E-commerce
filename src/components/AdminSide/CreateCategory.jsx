import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory, getCategory } from '../../redux/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "./Createcategory.css";
const CreateCategory = ({ toggleModal }) => {
    
    const dispatch = useDispatch();
    const [categoryName,setcategoryName] = useState("");
    const [description,setdescription] = useState("");
    const categoryImgref = useRef(null);
    const [errors, setErrors] = useState({
        categoryImg : "",
        categoryName :"",
        description :"",
    });

    const handleCreateCategory = async(event) =>{
        event.preventDefault();

        const newErrors = {
            categoryName: !categoryName ? "Please enter category name" : "",
            description: !description ? "Please description" : "",
            categoryImg: !categoryImgref.current?.files[0] ? "Please select an image" : "",
        };
        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            return;
        }
        setErrors({ categoryImg: "", categoryName: "", description: ""});

        const newCategory = {
            categoryName,
            description,
            categoryImg:categoryImgref.current.files[0],
        };

        try {

            await dispatch(addCategory(newCategory));
            toggleModal();
            dispatch(getCategory());

        } catch(error){
            console.error("failed to add",error);

        }
        setcategoryName(""),
        setdescription("");
        categoryImgref.current.value ="";
    }

  return (
    <div>
        <div className="overlay"></div>
        <div className="modal-content">
            <form className='creatCategory' onSubmit={handleCreateCategory}>
                <h2>Create category</h2>
                <div className="title">
                            <h5>Add category Image:</h5>
                            <input type="file" ref={categoryImgref} id="categoryImg" />
                            
                            {errors.image && <div className="error">{errors.image}</div>}
                        </div>
                        <div className="title">
                            <h5>category Name:</h5>
                            <input
                                type="text"
                                placeholder="Enter category Name"
                                value={categoryName}
                                onChange={(e) => setcategoryName(e.target.value)}
                                id="categoryName"
                            />
                            {errors.categoryName && (
                                <div className="error">{errors.categoryName}</div>
                            )}
                        </div>
                        <div className="title">
                            <h5>description:</h5>
                            <input
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                id="description"
                            />
                            {errors.description && (
                                <div className="error">{errors.description}</div>
                            )}
                        
                       
                           
                        </div>
                        <div className='buttons'>
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
  )
}

export default CreateCategory