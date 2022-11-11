import { useEffect, useCallback } from 'react';

export function useOnClickOutside(ref, handler) {
	useEffect(
		() => {
			const listener = (event) => {
				const refs = Array.isArray(ref) ? ref : [ref];

				for (let i = 0; i < refs.length; i += 1) {
					const r = refs[i];

					// Do nothing if clicking ref's element or descendent elements
					if (!r.current || r.current.contains(event.target)) {
						return;
					}
				}

				handler(event);
			};

			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);

			// remove event listeners on unmount
			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		// Add ref and handler to effect dependencies
		// handler is wrapped in useCallback for optimization since
		// a new function will be sent each render.
		[ref, useCallback(handler)],
	);
}
