import { useState, useEffect } from 'react';

const useTimer = (initialValue = 0) => {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(initialValue);

	useEffect(() => {
		let interval;
		if (isRunning) {
			interval = setInterval(
				() => setElapsedTime((prevElapsedTime) => prevElapsedTime + 1),
				1000,
			);
		}

		return () => clearInterval(interval);
	}, [isRunning]);

	return {
		elapsedTime,
		isRunning,
		setElapsedTime,
		setIsRunning,
	};
};

const useStopwatch = (initialValue = 0) => {
	const {
		elapsedTime,
		isRunning,
		setElapsedTime,
		setIsRunning
	} = useTimer(initialValue);

	const handleReset = () => {
		setElapsedTime(0);
		setIsRunning(false);
	};

	return {
		elapsedTime,
		isRunning,
		start: () => setIsRunning(true),
		stop: () => setIsRunning(false),
		reset: () => handleReset(),
	};
};

export default useStopwatch;
export { useStopwatch, useTimer };
