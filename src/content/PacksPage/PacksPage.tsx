import React, {FormEvent, useEffect, useState} from 'react';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/authAPI';
import PackItem from './PackItem';
import SuperInputText from '../../common/SuperInputText/SuperInputText';

type PacksPagePropsType = {
    packs: Array<GetPacksResponseType>
    itemsPerPage: number
    totalPacksCount: number
    currentPage: number
    createPack(name: string): void
    deletePack(id: string): void
    updatePack(id: string): void
    onPageChange(page: number): void
}

export type AddPackFormStateType = {
    value: string
    error: string
    hide: boolean
    touched: boolean
}

function PacksPage(props: PacksPagePropsType) {
    console.log('PacksPage called')

    let [formState, setFormState] =
        useState<AddPackFormStateType>({value: '', error: '', hide: true, touched: false})

    const onChangeHandler = (value: string) => {

        setFormState({
            ...formState,
            value: value.trim(),
        })
    }
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {

        setFormState({
            ...formState,
            touched: true
        })
    }
    const toggleHideInput = (hide: boolean) => {

        setFormState({
            ...formState,
            hide
        })
    }

    const packs = props.packs.map(p => {
        return <PackItem {...p}
                         key={p._id}
                         deleteCallback={() => props.deletePack(p._id)}
                         updateCallback={() => props.updatePack(p._id)}
        />
    })

    useEffect(() => {
    if (formState.touched && !formState.value) {
        setFormState({
            ...formState, error: 'Required'
        })
    } else {
        setFormState({
            ...formState, error: ''
        })
    }}, [formState.value, formState.touched])

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormState({
            ...formState,
            touched: true
        })
        if (formState.value) {
            props.createPack(formState.value)
            toggleHideInput(true)
        }
    }

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
                        {formState.hide
                            ? <button onClick={() => toggleHideInput(false)}>Add</button>
                            : <form className={style.inputBlock} onSubmit={onSubmitHandler}>
                                <button type='submit'>Add</button>
                                <SuperInputText
                                    value={formState.value}
                                    error={formState.error}
                                    onChangeText={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    placeholder={'Pack name'}
                                />
                                <span onClick={() => toggleHideInput(true)}>x</span>
                            </form>}
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
