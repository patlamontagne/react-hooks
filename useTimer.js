import { useState, useEffect } from 'react'

export const useTimer = (initialValue = 0) => {
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(initialValue)

    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(
                () => setElapsedTime((prevElapsedTime) => prevElapsedTime + 1),
                1000,
            )
        }

        return () => clearInterval(interval)
    }, [isRunning])

    return {
        isRunning,
        setIsRunning,
        elapsedTime,
        setElapsedTime,
    }
}

export const useStopwatch = (initialValue = 0) => {
    const {
        isRunning,
        setIsRunning,
        elapsedTime,
        setElapsedTime,
    } = useTimer(initialValue)

    const handleReset = () => {
        setIsRunning(false)
        setElapsedTime(0)
    }

    return {
        elapsedTime,
        resetTimer: () => handleReset(),
        startTimer: () => setIsRunning(true),
        stopTimer: () => setIsRunning(false),
        isRunning,
    }
}
