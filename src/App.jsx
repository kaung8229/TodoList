import React from "react"
import Navbar from "./components/Navbar"
import Sectionmain from "./components/Sectionmain"

function App() {
    return (
        <div className="w-screen h-screen grid place-items-center bg-teal-50 px-5 py-4 transition dark:bg-teal-900">
            <div className="w-[100%] md:w-[80%] lg:w-[70%] h-[100%] md:h-[85%] flex flex-col text-teal-950 bg-teal-50 border border-gray-300 rounded-lg shadow-2xl overflow-hidden transition dark:text-teal-50 dark:bg-teal-950">
                <Navbar />
                <Sectionmain />
            </div>
        </div>
    )
}

export default App
