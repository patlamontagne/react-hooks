import { useEffect, useCallback } from 'react'

export function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                const refs = Array.isArray(ref) ? ref : [ref]

                for (let i = 0; i < refs.length; i += 1) {
                    const r = refs[i]

                    // Do nothing if clicking ref's element or descendent elements
                    if (!r.current || r.current.contains(event.target)) {
                        return
                    }
                }
                
                handler(event)
            }

            document.addEventListener('mousedown', listener)
            document.addEventListener('touchstart', listener)

            return () => {
                document.removeEventListener('mousedown', listener)
                document.removeEventListener('touchstart', listener)
            }
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, useCallback(handler)],
    )
}
