import React from 'react';
import PacksPage from './PacksPage';

function PacksPageContainer() {
    console.log('PacksPageContainer called')

    const totalPacksCount = 20
    const packsPerPage = 4

    const pagesCount = Math.ceil(totalPacksCount / packsPerPage)

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i)



    return (
        <PacksPage packs={[]}
                   packsPerPage={4}
                   totalPacksCount={5}
                   currentPage={1}
                   onPageChange={a => a}/>
    )
}

export default PacksPageContainer;
