import React, {FormEvent, useEffect, useState} from 'react';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/AuthAPI';
import PackItem from './PackItem';
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import SearchContainer from '../../common/Search/SearchContainer';
// import ModalInputContainer from '../../common/modals/input/ModalInputContainer';
import ModalInputContainer2 from '../../common/modals/input2/ModalInputContainer2';
import {RootStateType} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getPacksTC, setSortPacksAC} from '../../redux/packs-reducer';

type PacksPagePropsType = {
    packs: Array<GetPacksResponseType>
    totalPacksCount: number
    createPack(name: string): void
    deletePack(id: string): void
    updatePack(id: string, name: string): void
}

export type AddPackFormStateType = {
    value: string
    error: string
    hide: boolean
    touched: boolean
}

function PacksPage(props: PacksPagePropsType) {
    console.log('PacksPage called')

    const dispatch = useDispatch()
    let [formState, setFormState] =
        useState<AddPackFormStateType>({value: '', error: '', hide: true, touched: false})

    let [isMine, setIsMine] = useState(false)

    const filter = useSelector((state: RootStateType): string => state.filterState.nameFilter)
    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const sort = useSelector((state: RootStateType) => state.packsPage.params.sortPacks)
    const crSorting = sort.slice(1) === 'created'

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
                  updateCallback={(name: string) => props.updatePack(p._id, name)}
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

    const setSort = (type: 'created' | 'updated') => {
        dispatch(setSortPacksAC(type))
        dispatch(getPacksTC())
    }

    const onModalSubmitHandler = (value: any) => {
        if (value.answer) {
            props.createPack(value.answer)
        }


        if (value.value1) {
            alert(value.value1)
        }

    }

    const onModalSubmitHandler2 = (value: any) => {
        if (value.answer1) {
            props.createPack(value.answer1)
        }

        if (value.answer2) {
            alert(value.answer2)
        }

    }

    const handleIsMineOnChange = () => {
        setIsMine(!isMine)
    }

    return (
        <div className={style.packsPageWrapper}>
            <h1 className={style.pageTitle}>Packs</h1>
            <div className={style.controlsContainer}>
                <div style={{alignSelf: 'flex-start', marginBottom: '5px'}}>
                    <SearchContainer
                        placeholder={'Pack name'}
                    />
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
                    <div style={{width: '10%'}}>
                        <span className={`${style.sortSettings} ${!crSorting ? style.activeSetting : ''}`}
                              onClick={() => setSort('updated')}>
                            {`Updated ${sort === '1updated' ? '↑' : '↓'}`}
                        </span>
                    </div>
                    <div style={{width: '10%', marginLeft: '12px'}}>
                        <span className={`${style.sortSettings} ${crSorting ? style.activeSetting : ''}`}
                              onClick={() => setSort('created')}>
                            {`Created ${sort === '1created' ? '↑' : '↓'}`}
                        </span>
                    </div>
                    <div style={{width: '15%'}}>
                        {/*{formState.hide*/}
                        {/*    ?*/}
                            <ModalInputContainer2 buttonTitle={'Add Pack'}
                                                  modalText={'Enter new pack name'}
                                                  isMine={true}
                                                  defaultAnswers={{
                                                      answer1: '',
                                                      answer2: '',
                                                      // answer3: 'answer3'
                                                  }}
                                                  answerCallback={onModalSubmitHandler2}
                            />
                            {/*: <form className={style.inputBlock} onSubmit={onSubmitHandler}>*/}
                            {/*    <button className={style.addButton}*/}
                            {/*            type='submit'>Add*/}
                            {/*    </button>*/}
                            {/*    <SuperInputText*/}
                            {/*        value={formState.value}*/}
                            {/*        error={formState.error}*/}
                            {/*        onChangeText={onChangeHandler}*/}
                            {/*        onBlur={onBlurHandler}*/}
                            {/*        placeholder={'Pack name'}*/}
                            {/*    />*/}
                            {/*    <span onClick={() => toggleHideInput(true)}>x</span>*/}
                            {/*</form>*/}
                        {/*}*/}
                    </div>
                    <div style={{width: '10%'}}/>
                </div>
                <ul>
                    {packsRender}
                </ul>
            </div>
        </div>
    )
}

export default PacksPage;
