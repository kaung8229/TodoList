import React, { useEffect, useState } from 'react'
import { darkmodefun } from './utils.js'

function Navbar() {
    const [darkmode, setDarkMode] = useState(JSON.parse(localStorage.getItem('tododarkmode')) || false);

    const darkmodeHandler = ()=>{
        setDarkMode(!darkmode);
    }

    useEffect(()=>{
        darkmodefun(darkmode);
        console.log(darkmode);
        localStorage.setItem('tododarkmode', JSON.stringify(darkmode));
    }, [darkmode])

    return (
        <div className='flex justify-between items-center border-b border-gray-400 p-5 dark:border-gray-500'>
            <h3 className='text-2xl font-bold'>TodoList</h3>
            <button className='text-3xl cursor-pointer' onClick={darkmodeHandler}>
                <ion-icon name={darkmode ? 'sunny' : 'moon'}></ion-icon>
            </button>
        </div>
    )
}

export default Navbar