import React, { useState } from 'react'
import { db } from '../app/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';

function Addtask({addnewtask, categories, addTaskShow, setAddTaskShow, setPopupShow, editing, setEditing}) {
    const [formState, setFormState] = useState(editing.status ? editing.data : {
        text: '',
        done: false,
        category: 'General'
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
                setPopupShow('Updated task');
                addnewtask(formState);
                setEditing({data: '', status: false});
            }
        }
    }

    return (
        <div className='absolute top-0 start-0 w-screen h-screen grid place-items-center bg-stone-950/75'>
            <form action='' method='' onSubmit={submitHandler} className='w-[80%] md:w-[40%] bg-teal-50 border rounded-lg p-5 dark:bg-teal-950'>
                <div className='mb-3'>
                    <label htmlFor='text' className='block text-2xl font-bold mb-2'>
                        {addTaskShow}
                    </label>
                    <input type="text" name='text' id='text' value={formState.text} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2' placeholder='Input here...' />
                    { newTaskErr && <span className='text-rose-500'>{newTaskErr}</span> }
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="category" className='block font-bold mb-2'>
                        Choose category
                    </label>
                    <select name="category" id="category" value={formState.category} onChange={changeHandler} className='w-full border border-gray-400 outline-0 rounded-md px-3 py-2'>
                        {
                            categories.map((category, idx)=>(
                                <option key={idx} value={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button type='reset' onClick={cancelHandler} className='bg-gray-300 hover:bg-gray-400 rounded-sm cursor-pointer p-1 dark:bg-gray-400 dark:hover:bg-gray-500'>
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