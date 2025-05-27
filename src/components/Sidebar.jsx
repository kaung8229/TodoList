import React, { useEffect, useState } from 'react'
import { db } from '../app/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';

function Sidebar({tasks, categories, setCategories, selectedCategory, setSelectedCategory, setAddCategoryShow, setEditing, setConfirmDelCateShow}) {

    const [drawerSidebar, setDrawerSidebar] = useState(false);

    let updatedcategory = [];

    const findcategory = categories?.findIndex(category => typeof(category) == 'string');
        // console.log(findcategory);
        if(findcategory != -1){
            // console.log("UPD");
            const updatedoldcategories = categories.map(category => {
                if(!category.colorCode){
                    return {text: category, colorCode: 'rose'}
                }else{
                    return category;
                }
            });
            // console.log(updatedoldcategories);
            updatedcategory = updatedoldcategories;

            (async()=>{
                console.log("WOKED");
                await updateDoc(doc(db, 'categorydata', 'categories'), {
                    lists: updatedoldcategories
                })
            })();
        }else{
            updatedcategory = categories;
        }

    const styles = {
        active: 'group flex justify-between items-center text-teal-50 text-left bg-teal-600 border border-teal-600 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-teal-600 dark:border-teal-600',
        normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-teal-100/50 border border-teal-950/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-teal-900/30 dark:border-gray-500',
        rose: {
            active: 'group flex justify-between items-center text-teal-50 text-left bg-rose-500 border border-rose-500 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-rose-500 dark:border-rose-500',
            normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-rose-500/10 border border-rose-500/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-rose-500/10 dark:border-rose-500'
        },
        orange: {
            active: 'group flex justify-between items-center text-teal-50 text-left bg-orange-500 border border-orange-500 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-orange-500 dark:border-orange-500',
            normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-orange-500/10 border border-orange-500/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-orange-500/10 dark:border-orange-500'
        },
        yellow: {
            active: 'group flex justify-between items-center text-black text-left bg-yellow-500 border border-yellow-500 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-black dark:bg-yellow-500 dark:border-yellow-500',
            normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-yellow-500/10 border border-yellow-500/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-yellow-500/10 dark:border-yellow-500'
        },
        blue: {
            active: 'group flex justify-between items-center text-teal-50 text-left bg-blue-500 border border-blue-500 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-blue-500 dark:border-blue-500',
            normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-blue-500/10 border border-blue-500/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-blue-500/10 dark:border-blue-500'
        },
        violet: {
            active: 'group flex justify-between items-center text-teal-50 text-left bg-violet-500 border border-violet-500 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-violet-500 dark:border-violet-500',
            normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-violet-500/10 border border-violet-500/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-violet-500/10 dark:border-violet-500'
        }
    };

    // console.log(updatedCategories);

    const selectHandler = (category)=>{
        setSelectedCategory(category)
    }

    const editHandler = ()=>{
        setAddCategoryShow("Edit category");
        setEditing({data: selectedCategory, status: true})
    }

    const overlayHandler = (e)=>{
        // console.log(e.target.classList.contains('overlay'));
        if(e.target.classList.contains('overlay')){
            setDrawerSidebar(false);
        }
    }

    const taskcount = tasks.reduce((init, task)=>{
        init[task.category] = task.lists.length;
        return init;
    }, {});

    // console.log(taskcount);

    return (
        <div className='shrink-0 w-[100%] sm:w-60 h-auto sm:h-[100%] border-b sm:border-b-0 sm:border-r border-gray-400 px-5 py-3 sm:py-4 dark:border-gray-500'>
            <div className='flex sm:hidden items-center gap-2'>
                <button onClick={()=>setDrawerSidebar(!drawerSidebar)} className='flex justify-center items-center text-3xl text-gray-500 hover:text-gray-900 cursor-pointer dark:hover:text-gray-50'>
                    <ion-icon name="list-outline"></ion-icon>
                </button>
                <strong className='text-lg'>Categories</strong>
            </div>
            <div onClick={overlayHandler} className={`${drawerSidebar ? `` : `max-sm:invisible `}max-sm:absolute top-0 start-0 max-sm:w-full max-sm:bg-zinc-900/50 transition-all z-[1] overlay`}>
                <div className={`max-sm:w-76 max-sm:h-screen max-sm:bg-zinc-50 transition-all ${drawerSidebar ? `` : `max-sm:translate-x-[-100%]`} max-sm:px-8 max-sm:pt-24 max-sm:dark:bg-zinc-900 max-sm:border-r-0 max-sm:dark:border-r`}>
                    <button onClick={()=>setDrawerSidebar(!drawerSidebar)} className='block sm:hidden ms-auto text-4xl text-gray-400 hover:text-gray-900 cursor-pointer mb-4 max-sm:dark:hover:text-gray-50'>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <div className='flex justify-between items-center mb-4'>
                        <strong className='text-lg'>Categories</strong>
                        <div className='flex gap-2'>
                            { selectedCategory !== 'All' && <button onClick={()=>setConfirmDelCateShow(selectedCategory)} className='size-6 flex justify-center items-center text-1xl font-bold text-teal-50 bg-rose-600 hover:ring-2 ring-rose-600 ring-offset-2 rounded-sm cursor-pointer dark:ring-offset-teal-950'>
                                <ion-icon name="trash"></ion-icon>
                            </button> }
                            { selectedCategory !== 'All' && <button onClick={editHandler} className='size-6 flex justify-center items-center text-1xl font-bold text-teal-50 bg-gray-600 hover:ring-2 ring-gray-600 ring-offset-2 rounded-sm cursor-pointer dark:ring-offset-teal-950'>
                                <ion-icon name="pencil"></ion-icon>
                            </button> }
                            <button onClick={()=>setAddCategoryShow("New category")} className='size-6 flex justify-center items-center text-2xl font-bold text-teal-50 bg-teal-600 hover:ring-2 ring-teal-600 ring-offset-2 rounded-sm cursor-pointer dark:ring-offset-teal-950'>
                                <ion-icon name="add"></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div className='h-[65vh] sm:h-[74vh] md:h-[60vh] flex flex-col gap-4 overflow-auto pb-2 sm:pb-0'>
                        <button className={selectedCategory === 'All' ? styles.active : styles.normal} onClick={()=>selectHandler('All')}>
                            All
                        </button>
                        {
                            updatedcategory.map((category, idx) => (
                                <button key={idx} className={selectedCategory === category.text ? styles[category.colorCode]?.active : styles[category.colorCode]?.normal} onClick={()=>selectHandler(category.text)}>
                                    <span className='text-nowrap'>{category.text}</span>
                                    <span>
                                        {
                                            taskcount[category.text] || '0'
                                        }
                                    </span>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar