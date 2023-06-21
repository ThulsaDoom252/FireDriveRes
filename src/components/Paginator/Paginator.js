import React, {useEffect, useState} from 'react';
import {MdKeyboardArrowLeft} from 'react-icons/md';
import {MdKeyboardArrowRight} from 'react-icons/md';

const Paginator = (props) => {
    const {
        0: currentMediaSet,
        1: mediaPerPage,
        2: currentPage,
        3: setCurrentPage,
        4: setFirstMediaIndex,
        5: setLastMediaIndex,
        6: totalPages,
        7: setTotalPages,
        8: fetchMediaSet,
        9: dispatch,
    } = props

    const [portionSize] = useState(4);
    const [portionNumber, setPortionNumber] = useState(1);

    useEffect(() => {
        const newTotalPagesValue = Math.ceil(currentMediaSet.length / mediaPerPage);
        dispatch(setTotalPages(newTotalPagesValue));
        dispatch(setCurrentPage(currentPage > newTotalPagesValue ? newTotalPagesValue : currentPage));
    }, [currentMediaSet, mediaPerPage]);

    useEffect(() => {
        const newFirstMediaIndex = (currentPage - 1) * mediaPerPage;
        const newLastMediaIndex = Math.min(currentPage * mediaPerPage, currentMediaSet.length);
        dispatch(setFirstMediaIndex(newFirstMediaIndex));
        dispatch(setLastMediaIndex(newLastMediaIndex));
    }, [currentMediaSet, mediaPerPage, currentPage]);

    const handlePrevClick = () => {
        dispatch(setCurrentPage(currentPage - 1));
        if ((currentPage - 1) % portionSize === 0) {
            setPortionNumber(portionNumber - 1);
        }
    };

    const handleNextClick = () => {
        dispatch(setCurrentPage(currentPage + 1));
        if (currentPage % portionSize === 0) {
            setPortionNumber(portionNumber + 1);
        }
    };

    const handlePageClick = (page) => {
        dispatch(setCurrentPage(page));
    };

    const disablePrevButton = currentPage === 1 || fetchMediaSet;
    const disableNextButton = currentPage === totalPages || fetchMediaSet;

    const pages = Array.from(Array(totalPages), (_, i) => i + 1)
        .filter((page) => page >= (portionNumber - 1) * portionSize + 1 && page <= portionNumber * portionSize);

    return (
        <div className="paginator">
            <span> <MdKeyboardArrowLeft
                className={`page-item page-arrow-left ${disablePrevButton && 'page-item-disabled'}`}
                onClick={!disablePrevButton ? handlePrevClick : void 0}
            /></span>
            {pages.map((page, index) => (
                <div key={index} className={`page-item`}
                     onClick={() => fetchMediaSet ? void 0 : handlePageClick(page)}>
                    <span style={{color: fetchMediaSet ? 'gray' : void 0}}>...<span
                        className={`page ${page === currentPage && 'pag-active'}`}>{page}</span>...</span>
                </div>
            ))}
            <span> <MdKeyboardArrowRight
                className={`page-item page-arrow-right ${disableNextButton && 'page-item-disabled'}`}
                onClick={!disableNextButton ? handleNextClick : void 0}
            /></span>

        </div>
    );
};

export default Paginator;
