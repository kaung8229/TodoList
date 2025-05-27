import React, { useState } from 'react'

function Addcategory({categories, setCategories, updatecategories, addcategoryShow, setAddCategoryShow, setPopupShow, editing, setEditing}) {
    const findcategorycolor = categories.find(category => category.text === editing.data);
    // console.log(findcategorycolor);
    const [newCategory, setNewCategory] = useState(editing.status ? editing.data : '');
    const [categoryColor, setCategoryColor] = useState(editing.status ? findcategorycolor?.colorCode : 'rose');
    const [categoryErr, setCategoryErr] = useState('');

    const changeHandler = (e)=>{
        setNewCategory(e.target.value);
    }

    const categorycolorHandler = (e)=>{
        setCategoryColor(e.target.value);
    }

    const cancelHandler = ()=>{
        setAddCategoryShow(null)
        setEditing({data: '', status: false});
    }
    
    const submitHandler = (e)=>{
        e.preventDefault();

        const categoryobj = {
            text: newCategory,
            colorCode: categoryColor
        };

        if(!newCategory.trim()){
            setCategoryErr('* This field can\'t be empty');
        }else{
            if(!editing.status){
                // console.log("adding");
                // console.log(categories.findIndex(category => category.text === newCategory));
                if(categories.findIndex(category => category.text === newCategory) == -1){
                    // console.log("WORK");
                    setCategoryErr('');
                    setCategories((prevState)=> [...prevState, categoryobj]);
                    updatecategories(categoryobj);
                    setAddCategoryShow(null);
                    setPopupShow('Created a new cateogry');
                }else{
                    // console.log("ALERT");
                    setCategoryErr('* This category already exits');
                    // alert("Already created");
                }
            }else{
                // console.log('editing');
                setCategoryErr('');
                updatecategories({newCategory, selected: editing.data, categoryColor});
                setAddCategoryShow(null);
                setPopupShow('Successfully Updated');
                setEditing({data: '', status: false});
            }
        }
    }

    return (
        <div className='absolute top-0 start-0 z-20 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <form action='' method='' onSubmit={submitHandler} className='w-[80%] md:w-[50%] bg-teal-50 border rounded-lg p-7 dark:bg-zinc-900 dark:border-gray-500'>
                <div className='mb-6'>
                    <label htmlFor='newcategory' className='block text-2xl font-semibold mb-3'>
                        {addcategoryShow}
                    </label>
                    <input type="text" name='newcategory' id='newcategory' value={newCategory} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2' placeholder='Input here...' />
                    { categoryErr && <span className='text-rose-500'>{categoryErr}</span> }
                </div>
                <div className='flex items-center gap-4 mb-6'>
                    <div>
                        <label htmlFor='rose' className={`size-7 block bg-rose-500 ${categoryColor === `rose` ? `ring-2 ring-rose-500 ring-offset-4 dark:ring-offset-zinc-900` : ``} rounded cursor-pointer`}></label>
                        <input type="radio" name='categorycolor' id='rose' value='rose' onChange={categorycolorHandler} className='hidden appearance-none' />
                    </div>
                    <div>
                        <label htmlFor='orange' className={`size-7 block bg-orange-500 ${categoryColor === `orange` ? `ring-2 ring-orange-500 ring-offset-4 dark:ring-offset-zinc-900` : ``} rounded cursor-pointer`}></label>
                        <input type="radio" name='categorycolor' id='orange' value='orange' onChange={categorycolorHandler} className='hidden appearance-none' />
                    </div>
                    <div>
                        <label htmlFor='yellow' className={`size-7 block bg-yellow-500 ${categoryColor === `yellow` ? `ring-2 ring-yellow-500 ring-offset-4 dark:ring-offset-zinc-900` : ``} rounded cursor-pointer`}></label>
                        <input type="radio" name='categorycolor' id='yellow' value='yellow' onChange={categorycolorHandler} className='hidden appearance-none' />
                    </div>
                    <div>
                        <label htmlFor='blue' className={`size-7 block bg-blue-500 ${categoryColor === `blue` ? `ring-2 ring-blue-500 ring-offset-4 dark:ring-offset-zinc-900` : ``} rounded cursor-pointer`}></label>
                        <input type="radio" name='categorycolor' id='blue' value='blue' onChange={categorycolorHandler} className='hidden appearance-none' />
                    </div>
                    <div>
                        <label htmlFor='violet' className={`size-7 block bg-violet-500 ${categoryColor === `violet` ? `ring-2 ring-violet-500 ring-offset-4 dark:ring-offset-zinc-900` : ``} rounded cursor-pointer`}></label>
                        <input type="radio" name='categorycolor' id='violet' value='violet' onChange={categorycolorHandler} className='hidden appearance-none' />
                    </div>
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

export default Addcategory