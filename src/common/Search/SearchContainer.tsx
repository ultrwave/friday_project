import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import NameFilterComponent from "./NameFilterComponent";
// import inputValidator from "../inputValidator";
import {setSearchAC} from "../../redux/search-reducer";

type SearchStateType = {
    value: string
}

function SearchContainer() {
    const dispatch = useDispatch()
    const [nameFilter, setNameFilter] = useState<SearchStateType>(
        {
            value: ""
        }
    )


    const onChangeHandler = (searchValue:string) => {
        setNameFilter({
            value: searchValue
        })
    }

    const onClickHandler = () => {
        dispatch(setSearchAC(nameFilter.value))
    }

    const onClearHandler = () => {
        setNameFilter({
            value: ''
        })
        dispatch(setSearchAC(''))
    }

    // useEffect(() => {
    //     onSubmitHandler(searchState.value)
    // }, [searchState.value])

    return (
        <div>
            <NameFilterComponent
                value={nameFilter.value}
                onChangeHandler={onChangeHandler}
                //onSubmitHandler={(onSubmitHandler)}
                onClearHandler = {onClearHandler}
                />
                <button onClick={onClickHandler}>Search</button>
        </div>
    );
}

export default SearchContainer;