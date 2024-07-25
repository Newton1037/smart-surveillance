"use client"
import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Camera, FlipHorizontal, PersonStanding, Video, Volume2 } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

type Props = {}

const page = (props: Props) => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [mirrored , setMirrored] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.8)

  function promptScreenshot(){

  }

  function recordVideo(){

  }

  function toggleAutoRecord(){
    if(autoRecordEnabled){
      setAutoRecordEnabled(false)
      toast("Auto record disabled")
    }else{
      setAutoRecordEnabled(true)
      toast("Auto record enabled")
    }
  }

  return (
    <div className="flex h-screen">
      
      {/* {Left section with Webcam and canvas} */}
      <div className="relative">
        <div className="relative h-screen w-full">
           <Webcam ref={webcamRef} mirrored={mirrored} className="h-full w-full object-contain p-2"/>
           <canvas ref={canvasRef} className="absolute top-0 left-0 h-full w-full object-contain"></canvas>
        </div>
      </div>

      {/* {Right section with all buttons} */}
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">

           {/* {upper section} */}
           <div className="flex flex-col gap-2">
             <ModeToggle />
             <Button variant="outline" size="icon">
               <FlipHorizontal 
                 onClick={() => setMirrored((prev) => !prev)}
               />
             </Button>
             <Separator className="my-2" />
           </div>

           {/* {middle section} */}
           <div className="flex flex-col gap-2">
             <Separator className="my-2" />

             <Button 
                variant={"outline"} 
                size={"icon"} 
                onClick={promptScreenshot}
              >
                <Camera />
              </Button>
             <Button 
                variant={isRecording ? "destructive" : "outline"} 
                size={"icon"} 
                onClick={recordVideo}
             >
              <Video />
             </Button>
             <Button 
                variant={autoRecordEnabled ? "destructive" : "outline"} 
                size={"icon"} 
                onClick={toggleAutoRecord}
             >
              {autoRecordEnabled ? <Rings color="white" height="45" /> : <PersonStanding />}
             </Button>
             
             <Separator className="my-2" />
           </div>

           {/* {lower section} */}
           <div className="flex flex-col gap-2">
             <Separator />

             <Popover>
              <PopoverTrigger>
                <Button variant="outline" size="icon">
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider 
                  min={0} 
                  max={1} 
                  step={0.2}
                  defaultValue={[volume]}
                  onValueCommit={(val) => {
                    setVolume(val[0])
                  }} 
                />
              </PopoverContent>
             </Popover>
           </div>
        </div>
      </div>

    </div>   
  )
}

export default page