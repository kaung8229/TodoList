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
            <p className='text-1xl text-gray-500 dark:text-gray-400'>{datekey}</p>
            { tasksbydate[datekey].map(list => (
                <li key={list.id} className={`flex items-center ${list.done ? `bg-teal-50/30` : `bg-teal-50`} rounded-md shadow-md mb-2 px-3 py-2 dark:bg-zinc-900 ${ list.done ? `dark:border-gray-800` : `dark:border-gray-500` }`}>
                    <span onClick={()=>doneHandler(task.category, list.id)} className={`shrink-0 flex justify-center items-center size-4 text-white ${list.done ? `bg-teal-600` : ``} border border-gray-900 rounded-full mr-2 dark:border-white`}>
                        { list.done ? <ion-icon name="checkmark-outline"></ion-icon> : '' }
                    </span>
                    <pre className={`relative font-sans mr-auto transition-all duration-300 task-text ${list.done ? `active` : ``}`}>
                        { list.text }
                    </pre>
                    <div className='relative ml-3'>
                        <button className={`size-6 flex justify-center items-center text-white bg-gray-600 hover:bg-gray-700 rounded-sm cursor-pointer p-1 menubtn`}>
                            <ion-icon name="ellipsis-vertical"></ion-icon>
                        </button>
                        <div className='absolute right-0 z-10 w-24 bg-gray-800 rounded-sm overflow-hidden menulist hidden'>
                            <button onClick={()=>moveHandler(task.category, list.id, datekey, list)} className={`${ list.done ? `hidden` : `` } w-full flex justify-center items-center text-white hover:bg-gray-700 cursor-pointer p-1`}>
                                move
                            </button>
                            <button onClick={()=>editHandler(task.category, list.id, datekey, list)} className={`${ list.done ? `hidden` : `` } w-full flex justify-center items-center text-white hover:bg-gray-700 cursor-pointer p-1`}>
                                edit
                            </button>
                            <button onClick={()=>deleteHandler(task, list.id)} className='w-full flex justify-center items-center text-rose-500 hover:bg-gray-700 cursor-pointer p-1'>
                                delete
                            </button>
                        </div>
                    </div>
               </li> 
            ))}
        </div>
        
    )
}

export default TaskItem