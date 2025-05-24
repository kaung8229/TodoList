import React, { useState } from 'react'
import { db } from '../app/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';

function Movetask({movetasks, categories, selectedCategory, moveTaskShow, setMoveTaskShow, setPopupShow, editing, setEditing}) {
    const [changeCategory, setChangeCategory] = useState(editing.data.category);
    // console.log(editing);

    const changeHandler = (e)=>{
        setChangeCategory(e.target.value);
    }

    const cancelHandler = ()=>{
        setMoveTaskShow(false);
        setEditing({data: '', status: false});
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        // console.log(editing.data);
        // console.log(changeCategory);
        movetasks(editing.data, changeCategory);
        setMoveTaskShow(false);
        setEditing({data: '', status: false});
        setPopupShow('Successfully moved');
    }

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <form action='' method='' onSubmit={submitHandler} className='w-[80%] md:w-[50%] bg-teal-50 border rounded-lg p-7 dark:bg-zinc-900 dark:border-gray-500'>
                <div className='mb-6'>
                    <label htmlFor="category" className='block text-2xl font-semibold mb-2'>
                        Choose category
                    </label>
                    <select name="category" id="category" value={changeCategory} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2'>
                        {
                            categories.map((category, idx)=>(
                                <option key={idx} value={category} className='dark:bg-zinc-800'>{category}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <button type='reset' onClick={cancelHandler} className='bg-gray-300 hover:bg-gray-400 rounded-sm cursor-pointer p-1 dark:bg-gray-500 dark:hover:bg-gray-600'>
                        Cancel
                    </button>
                    <button type='submit' className='text-teal-50 bg-teal-900 hover:bg-teal-950 rounded-sm cursor-pointer p-1 dark:bg-teal-800 dark:hover:bg-teal-900'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Movetask