import { useCallback, useState } from 'react'

export function useScrollTo(position = null) {
    // optional position must be an element ref OR an offsetTop integer position
    // (0 = for scroll top)
    const [ref, setRef] = useState(position)

    const scrollTo = useCallback(() => {
        if (ref !== null) {
            const top = Number.isInteger(ref) ? ref : ref.getBoundingClientRect().top
            
            window.scrollTo({
                // behavior: 'smooth',
                top,
            })
        }
    }, [ref])

    return [scrollTo, setRef]
}
