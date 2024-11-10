import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News"
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

const  user=await currentUser();
// console.log(user);

  return (
   <div className="pt-20">
    <div className="max-w-6xl mx-auto flex justify-between gap-8">
      {/* SiderBar */}
      <Sidebar user={user}/>
      {/* Feeds */}
      <Feed user={user}/>
      {/* News */}
      <News/>
    </div>
   
   </div>
  );
}
