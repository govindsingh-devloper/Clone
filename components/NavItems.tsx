import { Bell, BriefcaseBusiness, Home, MessageCircleMore, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

//Deifning type
//Method: 1
type NAVITEMS={
    src:string,
    icon:JSX.Element,
    text:string
}

//Method:2
// Interface NAVITEMS{
//     src:string,
//     icon:JSX.Element,
//     text:string
// }

const NavItems = () => {
    const navItems:NAVITEMS[]=[
        {
            src:"/home",
            icon:<Home/>,
            text:"Home",
        },
        {
            src:"/networks",
            icon:<User/>,
            text:"Networks",
        },
        {
            src:"/job",
            icon:<BriefcaseBusiness/>,
            text:"Job",
        },
        {
            src:"/message",
            icon:<MessageCircleMore/>,
            text:"Message",
        },
        {
            src:"/notification",
            icon:<Bell/>,
            text:"Notification",
        },
    ]
  return (
    <div className='flex gap-8'>
        {
            navItems.map((navItems,index)=>{
                return(
                    <div key={index} className='flex flex-col items-center cursor-pointer text-[#666666] hover:text-black'>
                        <span>{navItems.icon}</span>
                        <Link className='text-xs' href={navItems.src}>{navItems.text}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default NavItems