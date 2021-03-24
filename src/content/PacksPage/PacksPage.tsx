import React, {FormEvent, useEffect, useState} from 'react';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/API';
import PackItem from './PackItem';
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import SearchContainer from '../../common/Search/SearchContainer';
import ModalInputContainer from "../../common/modals/input/ModalInputContainer";

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
    console.log('CardsPage called')

    let [formState, setFormState] =
        useState<AddPackFormStateType>({value: '', error: '', hide: true, touched: false})

    let [isMine, setIsMine] = useState(false)

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

    const packs = props.packs
    // let packs = props.packs.filter(p => filter ? p.name.includes(filter) : true)
    // if (isMine) packs = packs.filter(p => p.user_id === myId)

    const packsRender = packs.map(p => {
        return <PackItem {...p}
                         key={p._id}
                         deleteCallback={() => props.deletePack(p._id)}
                         updateCallback={() => props.updatePack(p._id)}
        />
    })


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

    const onModalSubmitHandler = (value: string) => {
        // debugger
        if (value) {
            props.createPack(value)
        }

    }

    const handleIsMineOnChange = () => {
        setIsMine(!isMine)
    }

    return (
        <div className={style.packsPageWrapper}>
            <h1 style={{alignSelf: 'center'}}>Packs</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <div style={{alignSelf: 'flex-start', marginBottom: '5px'}}>
                    <SearchContainer/>
                </div>
                {/*<div>*/}
                {/*    <ModalContainer  modalText={'Simple Modal in packs'}  buttonText={'Close it!'}/>*/}
                {/*    <ModalInputContainer  modalText={'Simple Modal in packs'}  buttonText={'Close it!'}/>*/}
                {/*</div>*/}
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
                            ? <>
                                <button onClick={() => toggleHideInput(false)}>Add</button>
                                <ModalInputContainer buttonTitle={'AddModal'} modalText={'Enter the pack name'}
                                                     defaultAnswer={'New pack'}
                                                     answerCallback={onModalSubmitHandler}/>
                            </>
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
