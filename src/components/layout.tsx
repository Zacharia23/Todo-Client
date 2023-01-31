import React from "react";
const Layout = ({children}: any) => {
    return (
        <>
            <p> Header </p>
            {children}
            <p> Footer </p>
        </>
    )
}

export default Layout