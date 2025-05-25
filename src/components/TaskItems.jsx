import React from 'react'
import TaskItem from './TaskItem.jsx';
import { db } from '../app/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';

function TaskItems({task, sortDone, setAddTaskShow, setEditing, setMoveTaskShow, setConfirmDelTaskShow}) {

    const doneHandler = async(category, id)=>{
        task.lists[id].done = !task.lists[id].done;

        await updateDoc(doc(db, 'taskdata', category), {
            lists: task.lists
        });
    }

    const moveHandler = (category, id, date, list)=>{
        list.date = date;
        delete list.id;
        setMoveTaskShow(true);
        setEditing({data: {category, id, list}, status: false});
    }

    const editHandler = (category, id, date, {text, done})=>{
        setAddTaskShow('Edit task');
        setEditing({data: {category, id, text, done, date}, status: true});
    }

    const deleteHandler = async({category, lists}, id)=>{
        setConfirmDelTaskShow({category, lists, id});
    }

    // get data obj by different date
    const tasksbydate = task.lists.reduce((init, list, id)=>{
        init[list.date] = init[list.date] || [];
        init[list.date].push({text: list.text, done: list.done, id});
        return init;
    }, {});

    // to loop with date
    const datekeys = Object.keys(tasksbydate);
    datekeys.sort((x,y) => new Date(x) - new Date(y)); // sorting by date

    return (
        <div>
            <strong className='block text-center text-gray-500 mb-1'>{task.category}</strong>
            <ul className='flex flex-col gap-2'>
                {
                    datekeys.map(key => (
                        <TaskItem
                            key={key}
                            task={task}
                            sortDone={sortDone}
                            datekey={key}
                            tasksbydate={tasksbydate}
                            doneHandler={doneHandler}
                            moveHandler={moveHandler}
                            editHandler={editHandler}
                            deleteHandler={deleteHandler}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default TaskItems