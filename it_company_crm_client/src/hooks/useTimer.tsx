import {Dispatch, useState} from "react";

interface TimerReturnData {
    timer: any | null,
    setTimer: Dispatch<any>,
    loop: () => void
}

const useTimer = (callback: () => void, m: number) : TimerReturnData => {

    const [timer, setTimer] = useState<any | null>(null);

    // if(timer) return { timer, setTimer};
    // // let stop = false;

    const loop = () => {
        const timer_id = setTimeout(() => {
            callback();
            loop();
        }, m);
    }

    return {
        timer, setTimer, loop
    }
}

 export default useTimer;