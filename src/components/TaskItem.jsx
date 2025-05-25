import React from 'react'

function TaskItem({task, sortDone, datekey, tasksbydate, doneHandler, moveHandler, editHandler, deleteHandler}) {

    // sort data by done or undone
    tasksbydate[datekey].sort((x,y) => {
        if(sortDone){
            return y.done - x.done;
        }else{
            return x.done - y.done;
        }
    });

    return (
        <div>
            <p className='text-1xl text-gray-500'>{datekey}</p>
            { tasksbydate[datekey].map(list => (
                <li key={list.id} className={`flex items-center ${list.done ? `bg-teal-50/30` : `bg-teal-50`} border border-gray-200 rounded-md shadow-md mb-2 px-3 py-2 dark:bg-zinc-900 ${ list.done ? `dark:border-gray-800` : `dark:border-gray-500` }`}>
                   <span onClick={()=>doneHandler(task.category, list.id)} className={`shrink-0 flex justify-center items-center size-4 text-white ${list.done ? `bg-teal-600` : ``} border border-gray-900 rounded-full mr-2 dark:border-white`}>
                       { list.done ? <ion-icon name="checkmark-outline"></ion-icon> : '' }
                   </span>
                   <p className={`relative mr-auto transition-all duration-300 task-text ${list.done ? `active` : ``}`}>
                       { list.text }
                   </p>
                   <div className='flex items-center gap-1'>
                       <button onClick={()=>moveHandler(task.category, list.id, datekey, list)} className={`${ list.done ? `hidden` : `` } size-6 flex justify-center items-center text-white bg-gray-500 hover:bg-gray-700 rounded-sm cursor-pointer p-1`}>
                           <ion-icon name="move-outline"></ion-icon>
                       </button>
                       <button onClick={()=>editHandler(task.category, list.id, datekey, list)} className={`${ list.done ? `hidden` : `` } size-6 flex justify-center items-center text-white bg-gray-500 hover:bg-gray-700 rounded-sm cursor-pointer p-1`}>
                           <ion-icon name="pencil"></ion-icon>
                       </button>
                       <button onClick={()=>deleteHandler(task, list.id)} className='size-6 flex justify-center items-center text-white bg-rose-500 hover:bg-rose-700 rounded-sm cursor-pointer p-1'>
                           <ion-icon name="trash-outline"></ion-icon>
                       </button>
                   </div>
               </li> 
            ))}
        </div>
        
    )
}

export default TaskItem