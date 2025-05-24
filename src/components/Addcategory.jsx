import React, { useState } from 'react'

function Addcategory({setCategories, updatecategories, setAddCategoryShow, setPopupShow}) {
    const [newCategory, setNewCategory] = useState('');
    const [categoryErr, setCategoryErr] = useState('');

    const changeHandler = (e)=>{
        setNewCategory(e.target.value);
    }
    
    const submitHandler = (e)=>{
        e.preventDefault();
        if(!newCategory.trim()){
            setCategoryErr('* This field can\'t be empty');
        }else{
            setCategoryErr('');
            setCategories((prevState)=> [...prevState, newCategory]);
            updatecategories(newCategory);
            setAddCategoryShow(false);
            setPopupShow('Created a new cateogry');
            // console.log("ADD SUCCESSFULLY");
        }
    }

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <form action='' method='' onSubmit={submitHandler} className='w-[80%] md:w-[50%] bg-teal-50 border rounded-lg p-7 dark:bg-zinc-900 dark:border-gray-500'>
                <div className='mb-6'>
                    <label htmlFor='newcategory' className='block text-2xl font-semibold mb-3'>
                        New category
                    </label>
                    <input type="text" name='newcategory' id='newcategory' value={newCategory} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2' placeholder='Input here...' />
                    { categoryErr && <span className='text-rose-500'>{categoryErr}</span> }
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <button type='reset' onClick={()=>setAddCategoryShow(false)} className='bg-gray-300 hover:bg-gray-400 rounded-sm cursor-pointer p-1 dark:bg-gray-500 dark:hover:bg-gray-600'>
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

export default Addcategory