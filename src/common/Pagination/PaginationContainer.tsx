import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import PaginationDisplay from "./PaginationDisplay";
import {setCurrentPageAC, setItemsOnPageAC} from "../../redux/pagination-reducer";
import {RootStateType} from "../../redux/store";

type PaginationStateType = {
    currentPage: number
    itemsOnPage: number
}

function PaginationContainer() {
    const dispatch = useDispatch()
    const paginationState = useSelector((state: RootStateType): PaginationStateType => state.pagination)


    const getPage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
    }

    const getItemsOnPage = (itemsOnPage: number) => {
        dispatch(setItemsOnPageAC(itemsOnPage))
    }

    return (
        <div>
            <PaginationDisplay
                currentPage={paginationState.currentPage}
                itemsOnPage={paginationState.itemsOnPage}
                totalItems={54}
                getPage={getPage}
                getItemsOnPage={getItemsOnPage}
            />
        </div>
    );
}

export default PaginationContainer;
