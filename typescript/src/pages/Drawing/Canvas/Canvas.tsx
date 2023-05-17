import React, { useEffect, useRef } from "react";
import "./index.css";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (context: CanvasRenderingContext2D) => void;
};

export default function Canvas(props: CanvasProps) {
  const { draw, ...restProps } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 실행되는 함수
    const canvas = canvasRef.current;

    if (!canvas) {
      // canvas 요소가 없을 경우 함수 종료
      return;
    }

    // 2d로 그려라
    const context = canvas.getContext("2d");

    if (!context) {
      // 2D 컨텍스트를 가져올 수 없을 경우 함수 종료
      return;
    }

    // context를 props로 받아와서 그릴 것!
    draw(context);
  }, [draw]);

  console.log(canvasRef);

  return (
    <canvas
      width={props.width}
      height={props.height}
      ref={canvasRef}
      {...restProps}
    />
  );
}
