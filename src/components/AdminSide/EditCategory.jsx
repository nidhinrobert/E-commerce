import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editCategory, getCategorybyId } from '../../redux/slice';
import "./Createcategory.css";

const EditCategory = ({category,closeModal}) => {
    

    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState(category.categoryName);
    const [description, setDescription] = useState(category.description);
    const categoryImgref = useRef(null);

    const updateSubmit = async(id) => {
       
        if (!categoryName || !description ) {
            setError('Please fill in all fields');
            return;
        }
        const newData = {
            id,
            categoryName,
            description,
            categoryImg: categoryImgref.current.files[0],

        }
        console.log("data", newData)
        dispatch(editCategory(newData));

        closeModal();
        await dispatch(getCategorybyId(id));
       
         
         
       
 
     }

  return (
    <div>
         <form className='CategoryForm' onSubmit={(e) => {
          e.preventDefault();
          updateSubmit(category._id);
        }} >
                <h2>Edit Category</h2>
                <div className='title'>
                    <h5>Add category Image:</h5>
                    <input
                        type='file'
                        placeholder='Add User Pic'

                        id="image"

                        ref={categoryImgref}
                    />
                </div>

                <div className='title'>
                    <h5>Category Name:</h5>

                    <input
                        type="text"
                        placeholder='Enter First Name'
                        value={categoryName}
                        onChange={(e) =>
                            setCategoryName(e.target.value)}
                        id='firstname'


                    />
                </div>
                <div className='title'>
                    <h5>Last Name:</h5>
                    <input
                        type="text"
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)}
                        id='description'
                    />
                </div>

               
                

                <div className='buttons'>
                    <button type='submit'  >Edit</button>
                    <button onClick={closeModal} className='cancel_btn'>Cancel</button>
                </div>
            </form>

    </div>
  )
}

export default EditCategory