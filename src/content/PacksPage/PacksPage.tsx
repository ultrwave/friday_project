import React, {FormEvent, useEffect, useState} from 'react';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/API';
import PackItem from './PackItem';
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import SearchContainer from '../../common/SearchComponent/SearchContainer';
import {RootStateType} from '../../redux/store';
import {useSelector} from 'react-redux';

type PacksPagePropsType = {
    packs: Array<GetPacksResponseType>
    totalPacksCount: number
    createPack(name: string): void
    deletePack(id: string): void
    updatePack(id: string): void
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

    let [isMine, setIsMine] = useState(false)

    const filter = useSelector((state: RootStateType): string => state.searchValue.searchValue)
    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)

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

    let packs = props.packs.filter(p => filter ? p.name.includes(filter) : true)
    if (isMine) packs = packs.filter(p => p.user_id === myId)
    let packsRender = packs.map(p =>
        <PackItem {...p}
                  key={p._id}
                  deleteCallback={() => props.deletePack(p._id)}
                  updateCallback={() => props.updatePack(p._id)}
        />)

    useEffect(() => {
        if (formState.touched && !formState.value) {
            setFormState({...formState, error: 'Required'})
        } else {
            setFormState({...formState, error: ''})
        }
    }, [formState.value, formState.touched])

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormState({
            ...formState,
            touched: true
        })
        if (formState.value) {
            props.createPack(formState.value)
            toggleHideInput(true)
        } else if (formState.touched) {
            toggleHideInput(true)
        }
    }

    return (
        <div className={style.packsPageWrapper}>
            <h1 className={style.pageTitle}>Packs</h1>
            <div className={style.controlsContainer}>
                <div style={{alignSelf: 'flex-start', marginBottom: '5px'}}>
                    <SearchContainer/>
                    <input type="checkbox"
                           checked={isMine}
                           onChange={() => setIsMine(!isMine)}
                    />
                    <span style={{fontSize: '12px', marginLeft: '2px', color: 'gray'}}>Show mine</span>
                </div>
                <div style={{alignSelf: 'flex-end', marginBottom: '5px'}}>
                    <PaginationContainer totalItems={props.totalPacksCount}/>
                </div>
            </div>
            <div className={style.table}>
                <div className={style.tableHeader}>
                    <div style={{width: '15%'}}>Name</div>
                    <div style={{width: '10%'}}>Cards count</div>
                    <div style={{width: '20%'}}>User</div>
                    <div style={{width: '10%'}}>Updated</div>
                    <div style={{width: '10%'}}>Created</div>
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
                    <div style={{width: '20%'}}/>
                </div>
                <ul>
                    {packsRender}
                </ul>
            </div>
        </div>
    )
}

export default PacksPage;
