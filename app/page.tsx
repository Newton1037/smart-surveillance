"use client"
import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { beep } from '@/utils/audio'
import { Camera, FlipHorizontal, PersonStanding, Video, Volume2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import { Moon, Sun } from "lucide-react"
import Webcam from 'react-webcam'
import { toast } from 'sonner'
import * as cocossd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-backend-cpu'
import { ObjectDetection } from '@tensorflow-models/coco-ssd'

type Props = {}

let interval : any = null

const page = (props: Props) => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [mirrored , setMirrored] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.8)
  const [model, setModel] = useState<ObjectDetection>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    initializeModel()
  } , [])

  async function initializeModel(){
    const loadedModel : ObjectDetection = await cocossd.load({
      base: 'mobilenet_v2' 
    })
    setModel(loadedModel)
  } 

  useEffect(() => {
    if(model){
      setLoading(false)
    }
  } , [model])

  async function runPredictions() {
     if(model && webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4){
       const predictions = await model.detect(webcamRef.current.video)
     }
  }

  useEffect(() => {
     interval = setInterval(() => {
        runPredictions()
     } , 1000)

     return () => clearInterval(interval)
  } , [webcamRef.current , model])

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

  function WikiSection(){
    return <div className="text-xs text-muted-foreground">
      <ul className="space-y-4">
        <li>
          <strong>Dark Mode/Sys Theme 🌗</strong>
          <p>Toggle between dark mode and system theme.</p>
          <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
            <Sun size={14} />
          </Button>{" "}
          /{" "}
          <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
            <Moon size={14} />
          </Button>
        </li>
        <li>
          <strong>Horizontal Flip ↔️</strong>
          <p>Adjust horizontal orientation.</p>
          <Button className='h-6 w-6 my-2'
            variant={'outline'} size={'icon'}
            onClick={() => {
              setMirrored((prev) => !prev)
            }}
          ><FlipHorizontal size={14} /></Button>
        </li>
        <Separator />
        <li>
          <strong>Take Pictures 📸</strong>
          <p>Capture snapshots at any moment from the video feed.</p>
          <Button
            className='h-6 w-6 my-2'
            variant={'outline'} size={'icon'}
            onClick={promptScreenshot}
          >
            <Camera size={14} />
          </Button>
        </li>
        <li>
          <strong>Manual Video Recording 📽️</strong>
          <p>Manually record video clips as needed.</p>
          <Button className='h-6 w-6 my-2'
            variant={isRecording ? 'destructive' : 'outline'} size={'icon'}
            onClick={recordVideo}
          >
            <Video size={14} />
          </Button>
        </li>
        <Separator />
        <li>
          <strong>Enable/Disable Auto Record 🚫</strong>
          <p>
            Option to enable/disable automatic video recording whenever
            required.
          </p>
          <Button className='h-6 w-6 my-2'
            variant={autoRecordEnabled ? 'destructive' : 'outline'}
            size={'icon'}
            onClick={toggleAutoRecord}
          >
            {autoRecordEnabled ? <Rings color='white' height={30} /> : <PersonStanding size={14} />}

          </Button>
        </li>

        <li>
          <strong>Volume Slider 🔊</strong>
          <p>Adjust the volume level of the notifications.</p>
        </li>
        <li>
          <strong>Camera Feed Highlighting 🎨</strong>
          <p>
            Highlights persons in{" "}
            <span style={{ color: "#FF0F0F" }}>red</span> and other objects in{" "}
            <span style={{ color: "#00B612" }}>green</span>.
          </p>
        </li>
        <Separator />
        <li className="space-y-4">
          <strong>Share your thoughts 💬 </strong>
          {/* <SocialMediaLinks/> */}
          <br />
          <br />
          <br />
        </li>
      </ul>
    </div>
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
              <PopoverTrigger asChild>
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
                    beep(val[0])
                  }} 
                />
              </PopoverContent>
             </Popover>
           </div>
        </div>
        
        <div className="flex-1 h-full py-4 px-2 overflow-y-scroll">
          <WikiSection />
        </div>      
      </div>

      {loading && <div className="z-50 absolute flex h-full w-full items-center justify-center bg-primary-foreground">
           Getting things Ready ... <Rings color="red" height="50"/>
          </div>
      }
    </div>   
  )
}

export default page