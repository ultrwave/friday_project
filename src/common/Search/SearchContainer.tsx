import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import NameFilterComponent from "./NameFilterComponent";
// import inputValidator from "../inputValidator";
import {setFiltersAC} from "../../redux/search-reducer";

export type SearchStateType = {
    nameFilter: string
    onlyMyPacks: boolean
}

function SearchContainer() {
    const dispatch = useDispatch()
    const [searchState, setSearchState] = useState<SearchStateType>(
        {
            nameFilter: "",
            onlyMyPacks: false
        }
    )

    const onChangeHandler = (searchValue: string) => {
        setSearchState({
            ...searchState,
            nameFilter: searchValue,
        })
    }

    const myPacksHandler = () => {
        setSearchState({
            ...searchState,
            onlyMyPacks: !searchState.onlyMyPacks
        })

        console.log(searchState)
    }
    const setFiltersHandler = () => {
        dispatch(setFiltersAC(searchState))
    }

    const onClearHandler = () => {
        setSearchState({
            ...searchState,
            nameFilter: ''
        })
        dispatch(setFiltersAC({
            ...searchState,
            nameFilter: ''
        }))
    }

    return (
        <div>
            <NameFilterComponent
                value={searchState.nameFilter}
                onChangeHandler={onChangeHandler}
                //onSubmitHandler={(onSubmitHandler)}
                onClearHandler={onClearHandler}
            />
            <input type="checkbox" id="showOnlyMyPacks" name="interest" checked={searchState.onlyMyPacks}
                   onClick={myPacksHandler}/>
            <label htmlFor="showOnlyMyPacks">Only my packs</label>
            <button onClick={setFiltersHandler}>Search</button>
        </div>
    );
}

export default SearchContainer;