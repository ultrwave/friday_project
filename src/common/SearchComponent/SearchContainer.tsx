import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import SearchComponent from "./SearchComponent";
// import inputValidator from "../inputValidator";
import {setSearchAC} from "../../redux/search-reducer";

type SearchStateType = {
    value: string
}

function SearchContainer() {
    const dispatch = useDispatch()
    const [searchState, setSearchState] = useState<SearchStateType>(
        {
            value: ""
        }
    )

    const onChangeHandler = (searchValue:string) => {
        setSearchState({
            value: searchValue
        })
    }

    const onSubmitHandler = (searchValue:string) => {
        dispatch(setSearchAC(searchValue))
    }

    return (
        <div>
            <SearchComponent
                value={searchState.value}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onSubmitHandler}
                />
        </div>
    );
}

export default SearchContainer;