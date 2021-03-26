import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import NameFilterComponent from "./NameFilterComponent";
// import inputValidator from "../inputValidator";
import {setFiltersAC} from "../../redux/search-reducer";

export type SearchStateType = {
    nameFilter: string
    onlyMyPacks: boolean
}
export type SearchContainerPropsType = {
    placeholder: string
}

function SearchContainer({placeholder}:SearchContainerPropsType) {
    const dispatch = useDispatch()
    const [searchState, setSearchState] = useState<SearchStateType>(
        {
            nameFilter: "",
            onlyMyPacks: true
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
        dispatch(setFiltersAC(searchState))
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
                placeholder={placeholder}
            />
            <input type="checkbox" id="showOnlyMyPacks" name="interest" checked={!searchState.onlyMyPacks}
                   onClick={myPacksHandler}/>
            <label htmlFor="showOnlyMyPacks">Only my packs</label>
            <button onClick={setFiltersHandler}
            style={{marginLeft: '10px'}}>Search</button>
        </div>
    );
}

export default SearchContainer;