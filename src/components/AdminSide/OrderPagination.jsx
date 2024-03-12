import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, getCustomers } from '../../redux/AdminSlice';
import PaginationCss from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const OrderPagination = () => {
    const dispatch = useDispatch();

    // Selectors
    const customersCount = useSelector((state) => state.admin.customersCount);
    const currentPageNumber = useSelector((state) => state.admin.currentPage);
    const itemsPerPage = useSelector((state) => state.admin.itemsPerPage);


    const totalPages = Math.ceil(customersCount / itemsPerPage);


    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    const previousPage = () => {
        const newPage = currentPageNumber - 1;
        dispatch(setCurrentPage(newPage));
    };


    const nextPage = () => {
        const newPage = currentPageNumber + 1;
        dispatch(setCurrentPage(newPage));
    };


    const selectPage = (page) => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {

        if (currentPageNumber > totalPages) {
            dispatch(setCurrentPage(totalPages));
        }
    }, [dispatch, currentPageNumber, totalPages]);


    console.log('itemsPerPage',itemsPerPage);
    console.log('currentPageNumber',currentPageNumber);
    console.log('totalPages',totalPages);

    return (
        <div className={PaginationCss.pagination}>
            {currentPageNumber > 1 && (
                <button className={PaginationCss.numbers} onClick={previousPage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            )}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`${PaginationCss.numbers} ${currentPageNumber === page ? PaginationCss.current : ''
                        }`}
                    onClick={() => selectPage(page)}
                >
                    {page}
                </button>
            ))}
            {currentPageNumber < totalPages && (
                <button className={PaginationCss.numbers} onClick={nextPage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            )}
        </div>
    );
};

export default OrderPagination;
