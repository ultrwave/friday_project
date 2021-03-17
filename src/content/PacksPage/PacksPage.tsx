import React from 'react';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/authAPI';
import PackItem from './PackItem';

type PacksPagePropsType = {
    packs: Array<GetPacksResponseType>
    itemsPerPage: number
    totalPacksCount: number
    currentPage: number
    onPageChange: (page: number) => void
}

function PacksPage(props: PacksPagePropsType) {
    console.log('PacksPage called')

    const packs = props.packs.map(p => {
        return <PackItem {...p}/>
    })

    return (
        <div className={style.packsPageWrapper}>
            <h1 style={{alignSelf: 'center'}}>Packs</h1>
            <div className={style.table}>
                <div className={style.tableHeader}>
                    <div style={{width: '15%'}}>Name</div>
                    <div style={{width: '15%'}}>Cards count</div>
                    <div style={{width: '15%'}}>Updated</div>
                    <div style={{width: '10%'}}>URL</div>
                    <div style={{width: '15%'}}>
                        <button>Add</button>
                    </div>
                    <div style={{width: '30%'}}/>
                </div>
                <ul>
                    {packs}
                </ul>
            </div>
        </div>
    )
}

export default PacksPage;
