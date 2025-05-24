import React, { useState } from 'react'
import { db } from '../app/firebase.js'
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

function Task({task, setAddTaskShow, setEditing, setConfirmDelTaskShow}) {

    const doneHandler = async(category, id)=>{
        // console.log(category, id);
        // console.log(task.lists);
        task.lists[id].done = !task.lists[id].done;
        // console.log(task.lists);
        await updateDoc(doc(db, 'taskdata', category), {
            lists: task.lists
        });
    }

    const editHandler = (category, id, {text, done})=>{
        // console.log("editing");
        // console.log(category, id);
        setAddTaskShow('Edit task');
        setEditing({data: {category, id, text, done}, status: true});
    }

    const deleteHandler = async({category, lists}, id)=>{
        // console.log("deleting")
        setConfirmDelTaskShow({category, lists, id});
    }

    // console.log(task);

    return (
        <div>
            <strong className='inline-block text-gray-500 mb-1'>{task.category}</strong>
            <ul className='flex flex-col gap-2'>
                {
                    task.lists.map((list, idx) => (
                        <li key={idx} className='flex items-center bg-teal-50 border border-gray-200 rounded-md shadow-md px-3 py-2 dark:bg-zinc-900 dark:border-gray-500'>
                            <span onClick={()=>doneHandler(task.category, idx)} className={`shrink-0 flex justify-center items-center size-4 text-white ${list.done ? `bg-teal-600` : ``} border border-gray-900 rounded-full mr-2 dark:border-white`}>
                                { list.done ? <ion-icon name="checkmark-outline"></ion-icon> : '' }
                            </span>
                            <p className={`relative mr-auto transition-all duration-300 task-text ${list.done ? `active` : ``}`}>
                                { list.text }
                            </p>
                            <div className='flex items-center gap-1'>
                                <button onClick={()=>editHandler(task.category, idx, list)} className={`${ list.done ? `hidden` : `` } size-6 flex justify-center items-center text-white bg-gray-500 hover:bg-gray-700 rounded-sm cursor-pointer p-1`}>
                                    <ion-icon name="pencil"></ion-icon>
                                </button>
                                <button onClick={()=>deleteHandler(task, idx)} className='size-6 flex justify-center items-center text-white bg-rose-500 hover:bg-rose-700 rounded-sm cursor-pointer p-1'>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Task