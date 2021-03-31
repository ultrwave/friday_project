import React from 'react';
import s from '../styles/PaginationDisplay.module.css';

type PaginationType = {
    currentPage: number
    totalItems: number
    itemsOnPage: number
    getPage(currentPage: number): void
    getItemsOnPage(itemsOnPage: number): void
}

function PaginationDisplay({currentPage, totalItems, itemsOnPage, getPage, getItemsOnPage}: PaginationType) {

    let pages: JSX.Element[] = []

    const lastPage = Math.ceil(totalItems / itemsOnPage)

    for (let i = 1; i <= lastPage; i++) pages.push((
        <button
            key={i}
            style={{background: currentPage === i ? '#4c4c4c' : undefined,
                color: currentPage === i ? 'white' : undefined}}
            onClick={() => getPage(i)}
        >
            {i}
        </button>
    ));

    // 1 ... 4 5 (6) 7 8 ... 11
    if ((currentPage + 4) < lastPage) {
        pages[currentPage + 2] = (
            <span key={currentPage + 3} style={{}}>
                - ... -
            </span>
        );
        pages = pages.filter((p, i) => i < (currentPage + 3) || i === (lastPage - 1));
    }
    if (currentPage > 5) {
        pages[1] = (
            <span key={2} style={{}}>
                - ... -
            </span>
        );
        pages = pages.filter((p, i) => i < 2 || i > currentPage - 4);
    }

    return (
        <div className={s.main}>
            <select value={itemsOnPage}
                    onChange={e => {
                        getItemsOnPage(Number(e.currentTarget.value))
                    }}
                    style={{}}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            {pages}
        </div>
    );
}

export default PaginationDisplay;
