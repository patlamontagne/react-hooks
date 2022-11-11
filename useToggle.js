import { useState } from 'react'

export default function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue)
    const setToggle = () => setValue(!value)
    return [value, setToggle]
}
