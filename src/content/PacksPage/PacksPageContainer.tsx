import React, {useEffect} from 'react';
import PacksPage from './PacksPage';
import {useDispatch, useSelector} from 'react-redux';
import {createPackTC, deletePackTC, getPacksTC, updatePackTC} from '../../redux/packs-reducer';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';


function PacksPageContainer() {
    console.log('PacksPageContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(getPacksTC(1, 5))
    }, [dispatch])

    const packs = useSelector((state:RootStateType) => state.packsPage.packs)
    const totalPacksCount = useSelector((state:RootStateType) => state.packsPage.totalPacksCount)
    const itemsPerPage = useSelector((state:RootStateType) => state.packsPage.itemsPerPage)
    const currentPage = useSelector((state:RootStateType) => state.packsPage.currentPage)

    const pagesCount = Math.ceil(totalPacksCount / itemsPerPage)

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i)

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
        !isLoggedIn
            ? <Redirect to={'login'}/>
            : <PacksPage
                packs={packs}
                createPack={createPack}
                deletePack={deletePack}
                updatePack={updatePack}
                itemsPerPage={itemsPerPage}
                totalPacksCount={totalPacksCount}
                currentPage={currentPage}
                onPageChange={a => a}/>
    )
}

export default PacksPageContainer;
