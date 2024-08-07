import { DetectedObject } from "@tensorflow-models/coco-ssd";

export function drawCanvas(
    mirrored: boolean ,
    predictions: DetectedObject[] ,
    ctx: CanvasRenderingContext2D | null | undefined
){
    predictions.forEach((detectedObject : DetectedObject) => {
       const {class: name, bbox, score} = detectedObject
       const [x, y, width, height] = bbox

       if(ctx){
        ctx.beginPath();

        ctx.fillStyle = name === "person" ? "#FF0F0F" : "blue"
        ctx.globalAlpha = 0.4
        
        {mirrored ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8) : ctx.roundRect(x, y, width, height, 8)}
        ctx.fill();

        ctx.font = "12px Courier New";
        ctx.fillStyle = 'white'
        ctx.globalAlpha = 1;

        {mirrored ? ctx.fillText(name, ctx.canvas.width - x - width + 15, y + 15) : ctx.fillText(name, x + 15, y + 15)}       
       }
    })
}