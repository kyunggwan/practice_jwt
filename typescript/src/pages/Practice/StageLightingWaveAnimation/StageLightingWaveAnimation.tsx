import {useRef} from 'react'

export default function StageLightingWaveAnimation () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div>
        <canvas ref={canvasRef} />
    </div>
  )
}
