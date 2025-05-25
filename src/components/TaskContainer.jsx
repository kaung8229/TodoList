import React, { useState } from 'react'
import TaskItems from './TaskItems';

function TaskContainer({tasks, selectedCategory, setAddTaskShow, setPopupShow, setEditing, setMoveTaskShow, setConfirmDelTaskShow}) {
    // use to sort tasks by done or undone
    const [sortDone, setSortDone] = useState(false);

    const sortHandler = ()=>{
        setSortDone(!sortDone)
    }

    let filterbycategory = [];
    // filter tasks by categories
    if(selectedCategory != 'All'){
        filterbycategory = tasks.filter(task => task.category === selectedCategory);
    }else{
        filterbycategory = tasks;
    }

    const totaltaskcount = tasks.reduce((init, task)=>{
        init += parseInt(task.lists.length);
        return init;
    }, 0);

    const donetaskcount = tasks.reduce((init, task)=>{
        const filterdonetask = task.lists.filter(list => list.done === true);
        init += parseInt(filterdonetask.length);
        return init;
    }, 0);

    return (
        <div className='w-full px-5 py-4'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <span className='inline-block w-18'>Total : {totaltaskcount}</span>
                    <span className='inline-block w-18'>Done : {donetaskcount}</span>
                    <button onClick={sortHandler} className={`text-teal-50 ${sortDone ? `bg-teal-600` : `bg-gray-400 dark:bg-gray-700`} rounded-sm cursor-pointer px-2 py-1`}>Sort by done</button>
                </div>
                <button onClick={()=>setAddTaskShow('New task')} className='flex justify-center items-center font-bold text-teal-50 bg-teal-600 hover:ring-2 ring-teal-600 ring-offset-2 rounded-sm cursor-pointer px-2 py-1 dark:ring-offset-teal-950'>
                    New
                </button>
            </div>
            <div className='h-[55vh] flex flex-col gap-3 overflow-auto'>
                {
                    // check if there is no task within category
                    filterbycategory.length ? (filterbycategory.map((task) => (
                        <TaskItems 
                            key={task.category} 
                            task={task} 
                            sortDone={sortDone}
                            setAddTaskShow={setAddTaskShow} 
                            setEditing={setEditing}
                            setMoveTaskShow={setMoveTaskShow}
                            setConfirmDelTaskShow={setConfirmDelTaskShow}
                        />
                    ))) : (
                        <p className='text-center text-gray-500 mt-5'>
                            There is no tasks. Create a new one
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default TaskContainer