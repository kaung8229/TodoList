import React from 'react'

function Sidebar({tasks, categories, selectedCategory, setSelectedCategory, setAddCategoryShow, setConfirmDelCateShow}) {

    // console.log(tasks);

    const styles = {
        active: 'group flex justify-between items-center text-teal-50 text-left bg-teal-950 border border-teal-950 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-950 dark:bg-teal-50 dark:border-teal-50',
        normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-teal-100/50 border border-teal-950/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-teal-950 dark:hover:bg-teal-900/50 dark:border-teal-50'
    };

    const selectHandler = (category)=>{
        setSelectedCategory(category)
    }

    const taskcount = tasks.reduce((init, task)=>{
        init[task.category] = task.lists.length;
        return init;
    }, {});

    // console.log(taskcount);

    return (
        <div className='w-[100%] sm:w-56 h-auto sm:h-[100%] border-b sm:border-b-0 sm:border-r border-gray-300 px-5 py-3'>
            <div className='flex justify-between items-center mb-4'>
                <strong className='text-lg'>Categories</strong>
                <button onClick={()=>setAddCategoryShow(true)} className='size-6 flex justify-center items-center text-2xl font-bold text-teal-50 bg-teal-500 hover:ring-2 ring-teal-500 ring-offset-2 rounded-sm cursor-pointer dark:ring-offset-teal-950'>
                    <ion-icon name="add"></ion-icon>
                </button>
            </div>
            <div className='h-auto sm:h-[60vh] flex flex-row sm:flex-col gap-4 overflow-auto pb-2 sm:pb-0'>
                <button className={selectedCategory === 'All' ? styles.active : styles.normal} onClick={()=>selectHandler('All')}>
                    All
                </button>
                {
                    categories.map((category, idx) => (
                        <button key={idx} className={selectedCategory === category ? styles.active : styles.normal} onClick={()=>selectHandler(category)}>
                            <span>{category}</span>
                            <span className="inline-block group-hover:hidden before:content-['-'] sm:before:content-['']">
                                {
                                    taskcount[category] || '0'
                                }
                            </span>
                            <div onClick={()=>setConfirmDelCateShow(category)} className='hidden group-hover:flex justify-center items-center text-1xl hover:text-white hover:bg-rose-500 rounded-sm p-0.5'>
                                <ion-icon name="trash-outline"></ion-icon>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar