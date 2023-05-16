import {useRef, RefObject, useEffect} from 'react'

export default function StageLightingWaveAnimation () {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log('3 useEffect');
    })

  return (
    <div>
        <canvas ref={canvasRef} />
    </div>
  )
}
