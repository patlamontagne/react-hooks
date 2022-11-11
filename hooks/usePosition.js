import { useState, useEffect } from 'react';

const defaultOptions = {
	enableHighAccuracy: false,
	timeout: Infinity,
	maximumAge: 0,
};

// see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
// for more info on possible options

export const usePosition = (watch = false, options = defaultOptions) => {
	const [position, setPosition] = useState({});
	const [error, setError] = useState(null);
	const [serviceEnabled, enableService] = useState(false);

	const onChange = ({ coords, timestamp }) => {
		setPosition({
			latitude: coords.latitude,
			longitude: coords.longitude,
			accuracy: coords.accuracy,
			speed: coords.speed,
			timestamp,
		});
	};

	const onError = (error) => {
		setError(error.message);
	};

	useEffect(() => {
		if (!serviceEnabled) return;

		if (!navigator || !navigator.geolocation) {
			setError('Geolocation is not supported');
			return;
		}

		let watcher = null;
		if (watch) {
			watcher = navigator.geolocation.watchPosition(
				onChange,
				onError,
				options,
			);
		} else {
			navigator.geolocation.getCurrentPosition(
				onChange,
				onError,
				options,
			);
		}

		return () => watcher && navigator.geolocation.clearWatch(watcher);
	}, [
		options.enableHighAccuracy,
		options.timeout,
		options.maximumAge,
		serviceEnabled,
	]);

	return { position, enableService, error };
};
