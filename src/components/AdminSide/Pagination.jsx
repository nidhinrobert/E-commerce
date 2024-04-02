import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, getCustomers } from '../../redux/AdminSlice';
import PaginationCss from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = () => {
    const dispatch = useDispatch();

    const customersCount = useSelector((state) => state.admin.customersCount);
    const currentPage = useSelector(state => state.admin.currentPage);
    const itemsPerPage = useSelector((state) => state.admin.itemsPerPage);

    console.log('currentPageNumber',currentPage);
    const totalPages = Math.ceil(customersCount / itemsPerPage);


    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    const previousPage = () => {
        const newPage = currentPage - 1;
        dispatch(setCurrentPage(newPage));
    };


    const nextPage = () => {
        const newPage = currentPage + 1;
        dispatch(setCurrentPage(newPage));
    };


    const selectPage = (page) => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {

        if (currentPage > totalPages) {
            dispatch(setCurrentPage(totalPages));
        }
    }, [dispatch, currentPage, totalPages]);

    return (
        <div className={PaginationCss.pagination}>
            {currentPage > 1 && (
                <button className={PaginationCss.numbers} onClick={previousPage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            )}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`${PaginationCss.numbers} ${currentPage === page ? PaginationCss.current : ''
                        }`}
                    onClick={() => selectPage(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button className={PaginationCss.numbers} onClick={nextPage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            )}
        </div>
    );
};

export default Pagination;
