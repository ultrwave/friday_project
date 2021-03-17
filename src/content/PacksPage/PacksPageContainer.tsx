import React, {useEffect} from 'react';
import PacksPage from './PacksPage';
import {useDispatch, useSelector} from 'react-redux';
import {getPacksTC} from '../../redux/packs-reducer';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';

function PacksPageContainer() {
    console.log('PacksPageContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(getPacksTC(1, 5))
    },[])

    const packs = useSelector((state: RootStateType) => state.packsPage.packs)
    const totalPacksCount = useSelector((state: RootStateType) => state.packsPage.totalPacksCount)
    const itemsPerPage = useSelector((state: RootStateType) => state.packsPage.itemsPerPage)


    const pagesCount = Math.ceil(totalPacksCount / itemsPerPage)

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i)

    return (
        !isLoggedIn
            ? <Redirect to={'login'}/>
            : <PacksPage packs={packs}
                   itemsPerPage={itemsPerPage}
                   totalPacksCount={5}
                   currentPage={1}
                   onPageChange={a => a}/>
    )
}

export default PacksPageContainer;
