import {Dispatch, useState} from "react";

interface TimerReturnData {
    timer: any | null,
    start: () => void,
    stop: () => void
}

const useSetTimeoutLoop = (callback: () => void, intervalMS: number) : TimerReturnData => {
    const [timer, setTimer] = useState<any | null>(null);

    const loop = () => {
        const timer_id = setTimeout(() => {
            callback();
            loop();
        }, intervalMS);
        setTimer(timer_id);
    }

    const start = () => {
        loop();
    }
    const stop = () =>{
        if(timer) {
            clearTimeout(timer);
        }
    } ;

    return {timer, start, stop}
}

 export default useSetTimeoutLoop;