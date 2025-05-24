import React, { useEffect } from 'react'

function Popupmsg({message, setPopupShow}) {

    useEffect(()=>{
        setTimeout(()=>{
            setPopupShow(null);
        }, 1500);
    }, [])

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <div className='w-[80%] md:w-[40%] bg-teal-50 border rounded-lg p-7 dark:bg-zinc-900 dark:border-gray-500'>
                <div className='text-8xl text-center text-teal-600 mb-4'>
                    <ion-icon name="checkmark-done-circle"></ion-icon>
                </div>
                <div className='text-center mb-4'>
                    <strong className='text-2xl font-bold'>
                        {message}
                    </strong>
                </div>
            </div>
        </div>
    )
}

export default Popupmsg