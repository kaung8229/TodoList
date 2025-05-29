export const initcategories = [
    'General',
    'Work',
    'Personal',
    'Birthday'
];

export const darkmodefun = (status)=>{
    // console.log(document.documentElement);
    // console.log(status);
    if(status){
        document.documentElement.classList.add("dark");
    }else{
        document.documentElement.classList.remove("dark");
    }
}



export const itemmenuHandler = (e)=>{
    const getmenus = document.querySelectorAll(".menulist");
    const getmenubtn = e.target.closest('button');

    if(getmenubtn){
        if(getmenubtn.classList.contains('menubtn')){
            getmenubtn.nextElementSibling?.classList.toggle("hidden");
        }
    }else{
        getmenus.forEach(getmenu => {
            getmenu?.classList.add("hidden");
        })
    }
}