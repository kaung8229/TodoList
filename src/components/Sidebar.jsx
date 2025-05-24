import React from 'react'

function Sidebar({tasks, categories, selectedCategory, setSelectedCategory, setAddCategoryShow, setEditing, setConfirmDelCateShow}) {

    // console.log(tasks);

    const styles = {
        active: 'group flex justify-between items-center text-teal-50 text-left bg-teal-600 border border-teal-600 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-teal-600 dark:border-teal-600',
        normal: 'group flex justify-between items-center text-teal-950 text-left bg-teal-50 hover:bg-teal-100/50 border border-teal-950/50 rounded-md cursor-pointer px-4 py-1 sm:px-3 transition dark:text-teal-50 dark:bg-zinc-900 dark:hover:bg-teal-900/30 dark:border-gray-500'
    };

    const selectHandler = (category)=>{
        setSelectedCategory(category)
    }

    const editHandler = ()=>{
        setAddCategoryShow("Edit category");
        setEditing({data: selectedCategory, status: true})
    }

    const taskcount = tasks.reduce((init, task)=>{
        init[task.category] = task.lists.length;
        return init;
    }, {});

    // console.log(taskcount);

    return (
        <div className='shrink-0 w-[100%] sm:w-60 h-auto sm:h-[100%] border-b sm:border-b-0 sm:border-r border-gray-400 px-5 py-4 dark:border-gray-500'>
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
            <div className='h-auto sm:h-[60vh] flex flex-row sm:flex-col gap-4 overflow-auto pb-2 sm:pb-0'>
                <button className={selectedCategory === 'All' ? styles.active : styles.normal} onClick={()=>selectHandler('All')}>
                    All
                </button>
                {
                    categories.map((category, idx) => (
                        <button key={idx} className={selectedCategory === category ? styles.active : styles.normal} onClick={()=>selectHandler(category)}>
                            <span className='text-nowrap'>{category}</span>
                            <span className="before:content-['-'] sm:before:content-['']">
                                {
                                    taskcount[category] || '0'
                                }
                            </span>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar