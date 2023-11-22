import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default async function DecksLayout({children} : {children:React.ReactNode}){
    return(
        <Sidebar> 
            {children} 
        </Sidebar>
    )
}