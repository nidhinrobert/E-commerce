import React, { useEffect } from 'react';
import "./Content.css";
import { getCategory } from '../../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Content = () => {
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const token = localStorage.getItem('token')
 const userId = localStorage.getItem('userId')
  useEffect(() => {
    dispatch(getCategory());
    console.log('Token:',token);
    console.log('userId:',userId);
  }, []);



  const handleProduct = (category) => {
    navigate('/product', { state: { categoryId: category._id, categoryName: category.categoryName } });
  }

  return (
    <div className='content-container'>
      <div className='category'>
        <h2 className='section-title'>Categories</h2>
        <div className='category-list'>
          {items && items.map((category, index) => (
            <div className='category-item' key={index}>
              <button className="product-btn" onClick={() => handleProduct(category)}>
                <div className='category-img-box'>
                  <img src={`http://localhost:5001/images/${category.categoryImg}`} alt="Category" />
                </div>
              </button>
              <h3 className='category-name'>{category.categoryName}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
