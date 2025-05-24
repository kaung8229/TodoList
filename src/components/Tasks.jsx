import React, { useState } from 'react'
import Task from './Task';

function Tasks({tasks, selectedCategory, setAddTaskShow, setPopupShow, setEditing, setConfirmDelTaskShow}) {
    // console.log(tasks);

    let filterbycategory = [];

    if(selectedCategory != 'All'){
        filterbycategory = tasks.filter(task => task.category === selectedCategory);
    }else{
        filterbycategory = tasks;
    }
    // console.log(filterbycategory);

    const totaltaskcount = tasks.reduce((init, task)=>{
        init += parseInt(task.lists.length);
        return init;
    }, 0);
    // console.log(totaltasks);

    const donetaskcount = tasks.reduce((init, task)=>{
        const filterdonetask = task.lists.filter(list => list.done === true);
        init += parseInt(filterdonetask.length);
        return init;
    }, 0);
    // console.log(donetaskcount);

    return (
        <div className='grow px-5 py-4'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <span className='inline-block w-20'>Total : {totaltaskcount}</span>
                    <span>Done : {donetaskcount}</span>
                </div>
                <button onClick={()=>setAddTaskShow('New task')} className='flex justify-center items-center font-bold text-teal-50 bg-teal-600 hover:ring-2 ring-teal-600 ring-offset-2 rounded-sm cursor-pointer px-2 py-1 dark:ring-offset-teal-950'>
                    New task
                </button>
            </div>
            <div className='h-[55vh] flex flex-col gap-3 overflow-auto'>
                {
                    filterbycategory.length ? (filterbycategory.map((task) => (
                        <Task 
                            key={task.category} 
                            task={task} 
                            setAddTaskShow={setAddTaskShow} 
                            setPopupShow={setPopupShow}
                            setEditing={setEditing}
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

export default Tasks