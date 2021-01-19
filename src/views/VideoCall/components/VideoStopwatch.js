import React, {useEffect} from 'react';
import { useStopwatch } from 'react-timer-hook';
const VideoStopwatch = (props) => {
    
    const { seconds, minutes, hours, start, pause} = useStopwatch({ autoStart: false });

    useEffect(() => {
        if(props.start){start()}
        if(!props.start){
            pause()
        }
    }, [props.start, pause , start])

    const twoDigit = (number) => {
        return ("0" + number).slice(-2);
    };
    return (
        <>
            <span>{twoDigit(hours)}</span>:<span>{twoDigit(minutes)}</span>:<span>{twoDigit(seconds)}</span>
        </>
    );
}

export default VideoStopwatch;