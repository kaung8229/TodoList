import React from 'react'
import { db } from '../app/firebase.js'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

function Deleteconfirmtask({confirmDelTaskShow, setConfirmDelTaskShow, setPopupShow}) {

    const deleteHandler = async()=>{
        // console.log(confirmDelTaskShow);
        const {category, lists, id} = confirmDelTaskShow;
        const filtertasks = lists.filter((list, idx) => idx !== id);
        // console.log(filtertasks.length);
        if(filtertasks.length != 0){
            await updateDoc(doc(db, 'taskdata', category), {
                lists: filtertasks
            });
        }else{
            await deleteDoc(doc(db, 'taskdata', category));
        }
        setConfirmDelTaskShow(null);
        setPopupShow("Successfully Deleted");
    }

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <div className='w-[80%] md:w-[50%] bg-teal-50 border rounded-lg p-7 dark:bg-zinc-900 dark:border-gray-500'>
                <div className='text-8xl text-center text-rose-600 mb-4'>
                    <ion-icon name="trash"></ion-icon>
                </div>
                <div className='text-center mb-8'>
                    <strong className='text-2xl font-bold'>
                        Are you sure ?
                    </strong>
                    <p className='text-gray-600 mt-2 dark:text-gray-300'>This can't be undone.</p>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button type='button' onClick={()=>{setConfirmDelTaskShow(null)}} className='bg-gray-300 hover:bg-gray-400 rounded-sm cursor-pointer p-1 dark:bg-gray-500 dark:hover:bg-gray-600'>
                        Cancel
                    </button>
                    <button type='button' onClick={()=>deleteHandler()} className='text-teal-50 bg-rose-500 hover:bg-rose-600 rounded-sm cursor-pointer p-1'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Deleteconfirmtask