import { useEffect, useState } from 'react'
import { TypeSetState } from '../interface/CommonInterface';

/**
 * const [user,setUser]=useLocalStorage('user',{})
 * const [user,setUser]=useLocalStorage('user',()=>{})
 */

/**
 * type script example
interface Py {
    name: string
}
class Mpy implements Py {
    name
    constructor(n: string) {
        this.name = n
    }
}

const [u, setu] = useLocalStorage<Py>("key")

 * 
 */







const PREFIX = "MLS-"


export default function useLocalStorage<T>(key: string, initValue: T | null = null): [T | null, TypeSetState<T | null>] {
    const prefixed_key = PREFIX + key

    const [state, setstate] = useState<T | null>(() => {
        if (localStorage.getItem(prefixed_key) !== null && localStorage.getItem(prefixed_key) !== "null") {
            console.log("not null===", localStorage.getItem(prefixed_key));
            return JSON.parse(localStorage.getItem(prefixed_key)!!)
        } else {
            return initValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixed_key, JSON.stringify(state))
        console.log("effect state=", state, localStorage.getItem(prefixed_key));

    }, [prefixed_key, state])

    return [state, setstate]
}
