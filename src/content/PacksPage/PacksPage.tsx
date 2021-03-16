import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PacksPage.module.css'

type PacksPagePropsType = {
    packs: Array<any>
    packsPerPage: number
    totalPacksCount: number
    currentPage: number
    onPageChange: (page: number) => void
}

function PacksPage(props: PacksPagePropsType) {
    console.log('PacksPage called')

    const packItem =
        <li>
            <div className={style.packItem}>
                <div style={{width: '15%'}}>pack1</div>
                <div style={{width: '15%'}}>7</div>
                <div style={{width: '15%'}}>03.03.2021</div>
                <div style={{width: '10%'}}>...</div>
                <div style={{width: '15%'}}>
                    <button>Delete</button>
                    <button>Update</button>
                </div>
                <div style={{width: '30%'}}>
                    <NavLink to={'/profile'}>cards</NavLink>
                </div>
            </div>
        </li>


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
                    {packItem}
                    {packItem}
                    {packItem}
                    {packItem}
                    {packItem}
                </ul>
            </div>
        </div>
    )
}

export default PacksPage;
