import React from "react";
import Header from "./header";
import Footer from "./footer";
const Layout = ({children}: any) => {
    return (
        <div className='flex flex-col w-full h-screen'>
            <div>
                <Header/>
            </div>
            <div className='grow'>
                {children}
            </div>
           <div>
               <Footer/>
           </div>

        </div>
    )
}

export default Layout