import React, {useEffect, useState} from 'react'
import style from './loader.module.css'
import loader from './loader.svg'

export function Loader() {

    // const [isMounted, setIsMounted] = useState(true);
    // const shouldRender = useDelayUnmount(isMounted, 500);
    // const mountedStyle = {opacity: 1, transition: 'opacity 500ms ease-in'};
    // const unmountedStyle = {opacity: 0, transition: 'opacity 500ms ease-in'};
    //
    // function useDelayUnmount(isMounted: boolean, delayTime: number) {
    //     const [shouldRender, setShouldRender] = useState(false);
    //
    //     useEffect(() => {
    //         let timeoutId: any;
    //         if (isMounted && !shouldRender) {
    //             setShouldRender(true);
    //         } else if (!isMounted && shouldRender) {
    //             timeoutId = setTimeout(
    //                 () => setShouldRender(false),
    //                 delayTime
    //             );
    //         }
    //         return () => clearTimeout(timeoutId);
    //     }, [isMounted, delayTime, shouldRender]);
    //     return shouldRender;
    // }
    //
    // const fadeStyle = isMounted ? mountedStyle : unmountedStyle
    //
    // useEffect(() => {
    //     setTimeout(() => setIsMounted(false), 100)

    // return (
    //         <div className={`${style.dimScreen} ${fadeStyle}`}>
    //             <img className={style.loader}
    //                  src={loader}
    //                  alt="Loading..."/>
    //         </div>
    // )

    return (
        <div className={`${style.dimScreen}`}>
            <img className={style.loader}
                 src={loader}
                 alt="Loading..."/>
        </div>
    )
}
