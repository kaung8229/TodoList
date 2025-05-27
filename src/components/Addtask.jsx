import React, { useState } from 'react'

function Addtask({addnewtask, categories, selectedCategory, addTaskShow, setAddTaskShow, setPopupShow, editing, setEditing}) {
    const getdate = new Date();
    const year = getdate.getFullYear();
    const getmonth = getdate.getMonth()+1;
    const month = getmonth < 10 ? '0'+getmonth : getmonth;
    const day = getdate.getDate();
    const defaultdate = `${year}-${month}-${day}`;
    // console.log(defaultdate);

    const [formState, setFormState] = useState(editing.status ? editing.data : {
        text: '',
        done: false,
        category: selectedCategory === 'All' ? 'General' : selectedCategory,
        date: defaultdate
    });
    const [newTaskErr, setNewTaskErr] = useState('');

    const changeHandler = (e)=>{
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const cancelHandler = ()=>{
        setAddTaskShow(null);
        setEditing({data: '', status: false});
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        // console.log(formState);

        if(!formState.text.trim()){
            setNewTaskErr('* This field can\'t be empty');
        }else{
            if(!editing.status){
                // console.log("Adding new");
                setNewTaskErr('');
                setAddTaskShow(null);
                setPopupShow('Created a new task');
                // console.log(formState);
                addnewtask(formState);
            }else{
                // console.log("Editing");
                // console.log(formState);
                setNewTaskErr('');
                setAddTaskShow(null);
                addnewtask(formState);
                setEditing({data: '', status: false});
                setPopupShow('Updated task');
            }
        }
    }

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <form action='' method='' onSubmit={submitHandler} className='w-[80%] md:w-[50%] bg-teal-50 border rounded-lg p-7 dark:bg-zinc-900 dark:border-gray-500'>
                <div className='mb-6'>
                    <label htmlFor='text' className='block text-2xl font-semibold mb-3'>
                        {addTaskShow}
                    </label>
                    <textarea name="text" id="text" value={formState.text} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2' placeholder='Input here...'></textarea>
                    { newTaskErr && <span className='text-rose-500'>{newTaskErr}</span> }
                </div>
                
                {
                    editing.status ? '' : (
                    <div className='mb-6'>
                        <label htmlFor="category" className='block text-1xl font-semibold mb-2'>
                            Category
                        </label>
                        <select name="category" id="category" value={formState.category} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2'>
                            {
                                categories.map((category, idx)=>(
                                    <option key={idx} value={category.text} className='dark:bg-zinc-800'>{category.text}</option>
                                ))
                            }
                        </select>
                    </div>
                    )
                }

                <div className='mb-6'>
                    <label htmlFor='date' className='block text-1xl font-semibold mb-3'>
                        Date
                    </label>
                    <input type="date" name='date' id='date' value={formState.date} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2' placeholder='Input here...' />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <button type='reset' onClick={cancelHandler} className='bg-gray-300 hover:bg-gray-400 rounded-sm cursor-pointer p-1 dark:bg-gray-500 dark:hover:bg-gray-600'>
                        Cancel
                    </button>
                    <button type='submit' className='text-teal-50 bg-teal-900 hover:bg-teal-950 rounded-sm cursor-pointer p-1 dark:bg-teal-800 dark:hover:bg-teal-900'>
                        {editing.status ? 'Save' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Addtask