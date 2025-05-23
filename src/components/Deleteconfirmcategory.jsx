import React from 'react'
import { db } from '../app/firebase.js'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

function Deleteconfirmcategory({confirmDelCateShow, setConfirmDelCateShow, categories, setCategories, setPopupShow, setSelectedCategory}) {
    // console.log(confirmDelCateShow);
    const filteredcategories = categories.filter(category => category !== confirmDelCateShow);
    const deleteHandler = async()=>{
        setConfirmDelCateShow(null);
        setCategories(filteredcategories);
        await updateDoc(doc(db, 'categorydata', 'categories'), {
            lists: filteredcategories
        });
        await deleteDoc(doc(db, 'taskdata', confirmDelCateShow));
        setPopupShow("Successfully Deleted");
        setSelectedCategory('All');
    }

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <div className='w-[80%] md:w-[40%] bg-teal-50 border rounded-lg p-5 dark:bg-teal-950'>
                <div className='text-8xl text-center text-rose-600 mb-4'>
                    <ion-icon name="trash"></ion-icon>
                </div>
                <div className='text-center mb-8'>
                    <strong className='text-2xl font-bold'>
                        Are you sure ?
                    </strong>
                    <p className='text-gray-600 mt-2 dark:text-gray-300'>This will also delete all the tasks related to this cateogry.</p>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button type='button' onClick={()=>setConfirmDelCateShow(null)} className='bg-gray-300 hover:bg-gray-400 rounded-sm cursor-pointer p-1 dark:bg-gray-400 dark:hover:bg-gray-500'>
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

export default Deleteconfirmcategory