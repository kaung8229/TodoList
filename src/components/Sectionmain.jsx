import React, { useEffect, useState } from 'react'
import { db } from '../app/firebase.js'
import { collection, doc, setDoc, getDoc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

import Sidebar from './Sidebar'
import TaskContainer from './TaskContainer.jsx'
import Addtask from './Addtask';
import Addcategory from './Addcategory';

import Popupmsg from './Popupmsg.jsx';
import Deleteconfirmcategory from './Deleteconfirmcategory.jsx';
import Deleteconfirmtask from './Deleteconfirmtask.jsx';
import Movetask from './Movetask.jsx';

function Sectionmain() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [editing, setEditing] = useState({data: '', status: false});
    
    const [popupShow, setPopupShow] = useState(null);
    const [addTaskShow, setAddTaskShow] = useState(null);
    const [addcategoryShow, setAddCategoryShow] = useState(null);
    const [moveTaskShow, setMoveTaskShow] = useState(false);
    const [confirmDelCateShow, setConfirmDelCateShow] = useState(null);
    const [confirmDelTaskShow, setConfirmDelTaskShow] = useState(null);

    const dbReftask = collection(db, 'taskdata');
    const docRefcategory = doc(db, 'categorydata', 'categories');
    let taskdata = [];

    useEffect(()=>{
        getolddata();
    }, [])

    const getolddata = async()=>{
        try{
            const dbcategories = await getDoc(docRefcategory);
            // console.log(dbcategories.data().lists);
            setCategories(dbcategories.data().lists);

            onSnapshot(dbReftask, (docSnap)=>{
                taskdata = [];
                docSnap.forEach((doc) => {
                    // console.log(doc.data().lists);
                    // console.log(doc.id);
                    taskdata.push(doc.data());
                    setTasks(taskdata);
                })
                // prevent from duplicating
                if(!taskdata.length){
                    setTasks([]);
                }
            })
            
        }catch(err){
            console.log(err);
        }
    }

    const updatecategories = async(categoryobj)=>{
        try{
            // console.log("Updated category");
            if(!editing.status){
                await updateDoc(docRefcategory, {
                    lists: [...categories, categoryobj]
                });
            }else{
                const {newCategory, selected, categoryColor} = categoryobj;
                // console.log("editing/updating");
                // console.log(newCategory, selected, categoryColor);
                // console.log(categories);
                const updatecategory = categories.map(category => {
                    if(category.text === selected){
                        return {text: newCategory, colorCode: categoryColor}
                    }else{
                        return category;
                    }
                });
                // console.log(updatecategory);
                const changecategorytasks = tasks.find(task => task.category === selected);
                // console.log(changecategorytasks);
                setCategories(updatecategory);
                setSelectedCategory(newCategory);
                await updateDoc(docRefcategory, {
                    lists: updatecategory
                });
                await deleteDoc(doc(db, 'taskdata', selected));
                
                if(changecategorytasks){
                    changecategorytasks.category = newCategory;
                    changecategorytasks.colorCode = categoryColor;
                    await setDoc(doc(db, 'taskdata', newCategory), changecategorytasks);
                }
            }
        }catch(err){
            console.log("Error found while updating categories", err);
        }
    }

    const addnewtask = async(data)=>{
        const {text, done, category, date, id=0} = data;
        const docRef = doc(db, 'taskdata', category);
        const findcategorycolor = categories.find(cate => cate.text === category);
        // console.log(findcategorycolor);
        const newdata = {
            category: category,
            colorCode: findcategorycolor.colorCode,
            lists: [{text, done, date}]
        };

        // decide to create or update if there is no tasks in database
        if(!tasks.length){
            await setDoc(docRef, newdata);
        }else{
            // check/decide to update or create if there is no task list with category
            if(tasks.findIndex(task => task.category === category) != -1){
                // find the task with category
                const updatedata = tasks.find(task => task.category === category);
                
                if(!editing.status){
                    updatedata.lists.push({text, done, date});
                }else{
                    updatedata.lists[id].text = text;
                    updatedata.lists[id].date = date;
                }

                await updateDoc(docRef, updatedata);

            }else{
                await setDoc(docRef, newdata);
            }

        }
    }

    const movetasks = async(task, changeCategory)=>{
        const docRef = doc(db, 'taskdata', changeCategory);

        // find the task to exchange/update the task list
        const findtask = tasks.find(oldtask => oldtask.category === changeCategory);

        // find the task to delete old tasks list after exchanged/updated
        const findoldtask = tasks.find(oldtask => oldtask.category === task.category);

        // decide to update or create task list if there is no data task with category
        if(findtask){
            // exchange/update the task list in the task
            findtask.lists.push(task.list);
            await updateDoc(docRef, findtask);

            // filter tasks with task id
            const filtertask = findoldtask.lists.filter((list, idx) => idx !== task.id);

            // decide to delete whole data task or just task list
            if(filtertask.length){
                await updateDoc(doc(db, 'taskdata', task.category), {
                    category: task.category,
                    lists: filtertask
                })
            }else{
                await deleteDoc(doc(db, 'taskdata', task.category));
            }

        }else{
            const findcategorycolor = categories.find(category => category.text === changeCategory);
            // console.log(findcategorycolor);
            await setDoc(docRef, {
                category: changeCategory,
                colorCode: findcategorycolor.colorCode,
                lists: [task.list]
            });

            // filter tasks with task id
            const filtertask = findoldtask.lists.filter((list, idx) => idx !== task.id);

            // decide to delete whole data task or just data list
            if(filtertask.length){
                await updateDoc(doc(db, 'taskdata', task.category), {
                    category: task.category,
                    lists: filtertask
                })
            }else{
                await deleteDoc(doc(db, 'taskdata', task.category));
            }
        }
    }

    return (
        <div className='flex flex-col sm:flex-row'>
            <Sidebar 
                tasks={tasks}
                categories={categories} 
                setCategories={setCategories}
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                setAddCategoryShow={setAddCategoryShow} 
                setEditing={setEditing}
                setConfirmDelCateShow={setConfirmDelCateShow}
            />

            <TaskContainer 
                tasks={tasks} 
                selectedCategory={selectedCategory}
                setAddTaskShow={setAddTaskShow} 
                setPopupShow={setPopupShow}
                setEditing={setEditing}
                setMoveTaskShow={setMoveTaskShow}
                setConfirmDelTaskShow={setConfirmDelTaskShow}
            />
                
            { popupShow && 
                <Popupmsg 
                    message={popupShow}
                    setPopupShow={setPopupShow} 
                /> }

            { addTaskShow && 
                <Addtask 
                    addnewtask={addnewtask} 
                    categories={categories} 
                    selectedCategory={selectedCategory}
                    addTaskShow={addTaskShow}
                    setAddTaskShow={setAddTaskShow}
                    setPopupShow={setPopupShow} 
                    editing={editing}
                    setEditing={setEditing}
                /> }
                
            { addcategoryShow && 
                <Addcategory 
                    categories = {categories}
                    setCategories={setCategories} 
                    updatecategories={updatecategories}
                    addcategoryShow={addcategoryShow}
                    setAddCategoryShow={setAddCategoryShow} 
                    setPopupShow={setPopupShow} 
                    editing={editing}
                    setEditing={setEditing}
                /> }

            { moveTaskShow &&
                <Movetask
                    movetasks={movetasks}
                    categories={categories} 
                    selectedCategory={selectedCategory}
                    moveTaskShow={moveTaskShow}
                    setMoveTaskShow={setMoveTaskShow}
                    setPopupShow={setPopupShow} 
                    editing={editing}
                    setEditing={setEditing}
                />  
            }
            
            { confirmDelCateShow && 
                <Deleteconfirmcategory 
                    confirmDelCateShow={confirmDelCateShow}
                    setConfirmDelCateShow={setConfirmDelCateShow} 
                    categories={categories}
                    setCategories={setCategories} 
                    setPopupShow={setPopupShow}
                    setSelectedCategory={setSelectedCategory}
                /> }
            
            { confirmDelTaskShow && 
                <Deleteconfirmtask 
                    confirmDelTaskShow={confirmDelTaskShow}
                    setConfirmDelTaskShow={setConfirmDelTaskShow}
                    setPopupShow={setPopupShow}
                /> }
        </div>
    )
}

export default Sectionmain

// [
//     {
//         category: 'General',
//         data: [
//             {text: 'text', done: false, date: '12/5/2025'}
//         ]
//     }
// ]