import React from 'react';
import s from './NameFilterComponent.module.css';

type searchFieldType = {
    value: string
    onChangeHandler(value: string): void
    onClearHandler(): void
}


function NameFilterComponent({value, onChangeHandler, onClearHandler}: searchFieldType) {
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
        }
    }

    return (
        <div className={s.searchComponent}>
            <input
                type='text' className={s.input} value={value}
                onChange={(e) => onChangeHandler(e.currentTarget.value)}
                onKeyPress={handleKeyPress}
                placeholder={'Pack name'}
            />
            <button onClick={onClearHandler}>x</button>
        </div>
    );
}

export default NameFilterComponent;