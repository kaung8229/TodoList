import React, { useEffect, useState } from 'react'
import { db } from '../app/firebase.js'
import { collection, doc, setDoc, getDoc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

import Sidebar from './Sidebar'
import Tasks from './Tasks'
import Addtask from './Addtask';
import Addcategory from './Addcategory';

import { initcategories } from './utils.js'
import Popupmsg from './Popupmsg.jsx';
import Deleteconfirmcategory from './Deleteconfirmcategory.jsx';
import Deleteconfirmtask from './Deleteconfirmtask.jsx';

function Sectionmain() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [editing, setEditing] = useState({data: '', status: false});

    const [addTaskShow, setAddTaskShow] = useState(null);
    const [addcategoryShow, setAddCategoryShow] = useState(null);
    const [popupShow, setPopupShow] = useState(null);
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
                    // console.log(doc.data());
                    // console.log(doc.id);
                    taskdata.push(doc.data());
                    setTasks(taskdata);
                })
                if(!taskdata.length){
                    setTasks([]);
                }
            })
            
        }catch(err){
            console.log(err);
        }
    }

    const updatecategories = async(newCategory)=>{
        try{
            // console.log("Updated category");
            if(!editing.status){
                await updateDoc(docRefcategory, {
                    lists: [...categories, newCategory]
                });
            }else{
                // console.log("editing", newCategory);
                const updatecategory = categories.map(cate => cate === newCategory.selected ? newCategory.newCategory : cate);
                const changecategorytasks = tasks.find(task => task.category === newCategory.selected);
                // console.log(changecategorytasks);
                // console.log(updatedata);
                setCategories(updatecategory);
                setSelectedCategory(newCategory.newCategory);
                await updateDoc(docRefcategory, {
                    lists: updatecategory
                });
                
                if(changecategorytasks){
                    changecategorytasks.category = newCategory.newCategory;
                    await setDoc(doc(db, 'taskdata', newCategory.newCategory), changecategorytasks);
                    await deleteDoc(doc(db, 'taskdata', newCategory.selected));
                }
            }
        }catch(err){
            console.log("Error found while updating categories", err);
        }
    }

    const addnewtask = async({text, done, category, id=0})=>{
        // console.log(newtask);
        // console.log(done);
        // console.log(category);
        const docRef = doc(db, 'taskdata', category);
        const newdata = {
            category: category,
            lists: [{text, done}]
        };

        if(!tasks.length){
            // console.log("Create");
            await setDoc(docRef, newdata);
        }else{
            if(tasks.findIndex(task => task.category === category) != -1){
                // console.log("Update");
                
                const updatedata = tasks.find(task => task.category === category);
                
                if(!editing.status){
                    updatedata.lists.push({text, done});
                }else{
                    // console.log(updatedata.lists[id]);
                    updatedata.lists[id].text = text;
                }

                await updateDoc(docRef, updatedata);

            }else{
                // console.log("Add");
                await setDoc(docRef, newdata);
            }
        }
    }

    return (
        <div className='flex flex-col sm:flex-row'>
            <Sidebar 
                tasks={tasks}
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                setAddCategoryShow={setAddCategoryShow} 
                setEditing={setEditing}
                setConfirmDelCateShow={setConfirmDelCateShow}
            />

            <Tasks 
                tasks={tasks} 
                selectedCategory={selectedCategory}
                setAddTaskShow={setAddTaskShow} 
                setPopupShow={setPopupShow}
                setEditing={setEditing}
                setConfirmDelTaskShow={setConfirmDelTaskShow}
            />

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
                    setCategories={setCategories} 
                    updatecategories={updatecategories}
                    addcategoryShow={addcategoryShow}
                    setAddCategoryShow={setAddCategoryShow} 
                    setPopupShow={setPopupShow} 
                    editing={editing}
                    setEditing={setEditing}
                /> }
                
            { popupShow && 
                <Popupmsg 
                    message={popupShow}
                    setPopupShow={setPopupShow} 
                /> }
            
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
//         data: [ {text: 'text', done: false} ]
//     }
// ]