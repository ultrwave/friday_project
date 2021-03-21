import React from 'react';
import s from './NameFilterComponent.module.css';

type searchFieldType = {
    value: string
    onChangeHandler(value: string): void
    onClearHandler(): void
    // onSubmitHandler(value: string): void
}


function NameFilterComponent({value, onChangeHandler, onClearHandler}: searchFieldType) {
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            //alert(e.target.value)
            // onSubmitHandler(e.target.value)
        }
    }


    const handleOnBlur = (e: any) => {
        // onSubmitHandler(e.target.value)
    }

    const clearSearch = () => {
        onChangeHandler('')
        // onSubmitHandler('')
    }


    return (
        <div className={s.searchComponent}>
            <input
                type='text' className={s.input} value={value}
                onChange={(e) => onChangeHandler(e.currentTarget.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleOnBlur}
                placeholder={'Find on page'}
            />
            <button onClick={onClearHandler}>x</button>
        </div>
    );
}

export default NameFilterComponent;