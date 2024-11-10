
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProfilePhoto from "./shared/ProfilePhoto"
import { Textarea } from "@/components/ui/textarea"
import {Images } from "lucide-react"
import { useRef, useState } from "react"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { createPostAction } from "@/lib/serverActions"


export function PostDialog({setOpen,open,src}:{setOpen:any,open:boolean,src:string}) {

    const inputRef=useRef<HTMLInputElement>(null);
    const [selectedFile,setSelectedFile]=useState<string>("");
    const [inputState,setInputState]=useState<string>("")


    const fileChangeHandler=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files?.[0];
        if(file){
            const dataUrl=await readFileAsDataUrl(file);
            setSelectedFile(dataUrl);


        }

    }

    const changeHandler=(e:any)=>{
      setInputState(e.target.value);

    }
//Bakend se connection 
    const postActionHandler=async(formData:FormData)=>{
      const inputText=formData.get('inputText') as string
      // console.log(inputText);
      try {
        await createPostAction(inputState,selectedFile)
        
      } catch (error) {
        console.log("Error Occurred",error)
        
      }
      setInputState("");
      setOpen(false);
      

    }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={()=>setOpen(false)} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src}/>
            <div>
                <h1>Govind Full Stack</h1>
                <p className="text-xs">Post to anyone</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
       <form action={postActionHandler}>
                  <div className="flex flex-col">
                  <Textarea
                  id="name"
                  value={inputState}
                  placeholder="Type your message here." 
                  name="inputText"
                  onChange={changeHandler}
                  className="border-none text-lg focus-visible:ring-0"
                  />

                  <div className="my-4">
                    {
                        selectedFile &&(
                            <Image
                            src={selectedFile}
                            alt="previous-Image"
                            width={400}
                            height={400}
                            />
                        )
                    }
                  </div>

                  </div>
       
        <DialogFooter>
            <div className="flex items-centern gap-4">
                <input 
                type="file" 
                ref={inputRef}
                name="image" 
                className="hidden" accept="image/*"
                onChange={fileChangeHandler}
                />
                
                <Button type="submit">Post</Button>
            </div>
          
        </DialogFooter>
        </form>
        <Button 
        className="gap-2"
        variant={'ghost'}
        onClick={()=>inputRef?.current?.click()}
        >
            <Images className="text-blue-500"/>
            <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
