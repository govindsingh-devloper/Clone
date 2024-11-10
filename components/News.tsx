import { Info } from 'lucide-react'
import React from 'react'
interface NAVITEMs{
  heading:string,
  subHeading:string
}
const newItems:NAVITEMs[]=[
  {
    heading:'E-retailer retag health drinks',
    subHeading:'4h ago - 345 readers'

  },
  {
    heading:'Lets transport rasies $22million',
    subHeading:'4h ago - 323 readers'

  },
  {
    heading:'Casual waer is in at India Inc',
    subHeading:'4h ago - 234 readers'

  },
  {
    heading:'Smaller cities go on loans',
    subHeading:'4h ago - 112 readers'

  },
]
const News = () => {
  return (
    <div className='hidden md:block w-[25%] bg-white h-fit rounded-lg border border-gray-300 '>
      <div className='flex items-center justify-between p-3'>
        <h1 className='font-medium'>LinkedIn News</h1>
        <Info 
        size={18}
        />
        </div>

        <div>
             {
              newItems.map((item,index)=>{
                return(
                  <div key={index} className='px-3 py-2 hover:bg-gray-200 hover:cursor-pointer'>
                    <h1 className='text-sm font-medium'>{item.heading}</h1>
                    <p className='text-sm text-gray-600'>{item.subHeading}</p>
                  </div>
                )
              })
             }
        </div>

    </div>
  )
}

export default News