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