import React, {useEffect, useMemo} from 'react';
import PacksPage from './PacksPage';
import {useDispatch, useSelector} from 'react-redux';
import {createPackTC, deletePackTC, getPacksTC, updatePackTC} from '../../redux/packs-reducer';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';
import PaginationContainer from '../../common/Pagination/PaginationContainer';


function PacksPageContainer() {
    console.log('PacksPageContainer called')

    const dispatch = useDispatch()
    const page = useSelector((state: RootStateType): number => state.pagination.page)
    const pageCount = useSelector((state: RootStateType): number => state.pagination.pageCount)
    const appStatus = useSelector((state: RootStateType): string => state.appState.status)
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const packs = useSelector((state: RootStateType) => state.packsPage.packs)
    const totalPacksCount = useSelector((state: RootStateType) => state.packsPage.totalPacksCount)
    const itemsOnPage = useSelector((state: RootStateType) => state.pagination.pageCount)
    const pagesCount = Math.ceil(totalPacksCount / itemsOnPage)
    const pages = []; for (let i = 1; i <= pagesCount; i++) pages.push(i)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, page, pageCount])

    const createPack = (name: string) => {
        dispatch(createPackTC(name))
    }

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const updatePack = (id: string) => {
        dispatch(updatePackTC(id))
    }

    return (
        appStatus === 'idle' && !isLoggedIn
            ? <Redirect to={'/login'}/>
            : <PacksPage
                packs={packs}
                createPack={createPack}
                deletePack={deletePack}
                updatePack={updatePack}
                totalPacksCount={totalPacksCount}
            />
    )
}

export default PacksPageContainer;
