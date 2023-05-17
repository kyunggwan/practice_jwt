import { useRef } from "react";
import Canvas from "./Canvas/Canvas";
import "./index.css";

export default function Practice() {
  const BASE_CANVAS_HEIGHT = 200;
  const HOUSE_SIZE = 40;
  const DOOR_DIMENSIONS = {
    width: 20,
    height: 35,
  };
  const WINDOW_SIZE = 15;

  const drawArt = (context: CanvasRenderingContext2D) => {
    // 캔버스에 테두리 사각형 그리기
    // x좌표, y좌표, 가로크기, 세로크기
    // 좌표를 바꾸면 계속 그려지고 랜더링 하면 없어짐
    // context.strokeRect(100, 100, 50, 50);

    // 캔버스에 블루색 사각형 그리기
    context.fillStyle = "blue";
    context.fillRect(0, 0, window.innerWidth, BASE_CANVAS_HEIGHT / 2);

    context.fillStyle = "#72db1b";
    context.fillRect(
      0,
      BASE_CANVAS_HEIGHT / 2,
      window.innerWidth,
      BASE_CANVAS_HEIGHT / 2
    );

    // house
    context.fillStyle = "#292b29";
    const centerPoint = {
      x: window.innerWidth / 2,
      y: BASE_CANVAS_HEIGHT / 2,
    };

    const houseBaseLeftTop = {
      x: centerPoint.x - HOUSE_SIZE,
      y: centerPoint.y - HOUSE_SIZE,
    };
    context.fillRect(
      houseBaseLeftTop.x,
      houseBaseLeftTop.y,
      HOUSE_SIZE * 2,
      HOUSE_SIZE * 2
    );

    // doors
    context.fillStyle = "#dd6d41";
    context.fillRect(
      centerPoint.x - 10,
      BASE_CANVAS_HEIGHT / 2,
      DOOR_DIMENSIONS.width,
      DOOR_DIMENSIONS.height
    );

    // windows
    context.fillStyle = "#add";
    context.fillRect(
      centerPoint.x - 30,
      centerPoint.y - 25,
      WINDOW_SIZE,
      WINDOW_SIZE
    );
    context.fillRect(
      centerPoint.x + 15,
      centerPoint.y - 25,
      WINDOW_SIZE,
      WINDOW_SIZE
    );

    // 예제 따라해보기, 가운데 지우기
    context.fillStyle = "#b41feb";
    context.fillRect(25, 25, 100, 100);
    context.clearRect(45, 45, 60, 60);
    context.strokeRect(50, 50, 50, 50);
  };

  const drawExample = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "rgba(255, 0, 0, 0.637)"; // 채우기 스타일
    context.fillRect(20, 20, 100, 120); // 사각형 채워서 그려라
    context.strokeRect(30, 30, 100, 120); //

    // 뒤의 그림이 위에 표현된다.(덮어쓰기)
    context.fillStyle = "#00ff003b";
    context.fillRect(90, 95, 100, 120);
    // 삼각형 그리기 방법
    context.fillStyle = "#25a6f0";
    context.beginPath(); // 선 그리기 할 것이다 선언
    context.moveTo(50, 50); // 시작점
    context.lineTo(130, 130);
    context.lineTo(150, 200);
    context.closePath(); // 끝점을 넣으면 결국 삼각형이 그려짐
    context.fill(); // 채워라, 선만 그으려면 stroke()

    // 선그리기 방법, 별그리기
    context.beginPath();
    context.moveTo(300, 100);
    context.lineTo(350, 100);
    context.lineTo(310, 125);
    context.lineTo(325, 80);
    context.lineTo(340, 125);
    context.lineTo(300, 100);
    context.closePath();
    context.stroke();

    // 원형그리기
    context.beginPath();
    // x, y, 반지름, 시작 각도(radians단위), 끝 각도(여기서는 2파이), false:시계방향
    context.arc(450, 100, 30, 0, 2 * Math.PI, false);
    context.stroke();

    // 곡선 그리기
    context.beginPath();
    context.moveTo(515, 25);
    // (a, b, c, d) = (a,b) 에서 (c,d)로 곡선만듦
    context.quadraticCurveTo(525, 25, 525, 65);
    context.quadraticCurveTo(560, 80, 600, 65);
    context.quadraticCurveTo(600, 20, 610, 25);
    context.quadraticCurveTo(550, 30, 515, 25);
    context.stroke();

    // 곡선 그리기2
    context.beginPath();
    context.moveTo(655, 45);
    context.bezierCurveTo(640, 20, 620, 40, 620, 55);
    context.quadraticCurveTo(620, 70, 655, 90);
    context.quadraticCurveTo(690, 70, 690, 55);
    context.bezierCurveTo(690, 40, 670, 20, 655, 45);
    context.fill();
  };

  const drawStyles = (ctx: CanvasRenderingContext2D) => {
    /* 캔버스 칠하기: 색상 적용 */
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.fillStyle =
          "rgb(" +
          Math.floor(140 - 30 * i) +
          "," +
          Math.floor(34 * j) +
          "," +
          80 +
          ")";
        ctx.fillRect(i * 30, j * 30, 30, 30);
      }
    }

    /* 캔버스 칠하기: 투명도 rgba */
    ctx.fillStyle = "#52a2b9";
    ctx.fillRect(200, 0, 200, 200);

    for (var i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.arc(
        215 + (Math.random() * 150 + i),
        30 + (Math.random() * 140 + i),
        2 + Math.random() * 3,
        0,
        Math.PI * 2,
        true
      );
      // 마지막 값이 투명도 옵션, 랜덤 색을 칠해진다.
      ctx.fillStyle = "rgba(255,255,255," + (0.3 + Math.random() * 1) + ")";
      ctx.fill();
    }

    /* 캔버스 칠하기: 투명도 globalAlpha */
    ctx.fillStyle = "#FD0";
    ctx.fillRect(450, 0, 75, 75);
    ctx.fillStyle = "#6C0";
    ctx.fillRect(525, 0, 75, 75);
    ctx.fillStyle = "#09F";
    ctx.fillRect(450, 75, 75, 75);
    ctx.fillStyle = "#F30";
    ctx.fillRect(525, 75, 75, 75);
    ctx.fillStyle = "#FFF";
    // 투명한 반투명 원 설정
    ctx.globalAlpha = 0.2; // 투명 값 설정, 앞으로 계속 투명하다.
    for (var i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(525, 75, 10 + 10 * i, 0, Math.PI * 2, true);
      ctx.fill();
    }
    ctx.globalAlpha = 1; // 밑으로는 투명 해제

    /* 캔버스 칠하기: 선 스타일 */
    for (var i = 0; i < 10; i++) {
      ctx.lineWidth = 1 + i;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(650 + i * 14, 5);
      ctx.lineTo(650 + i * 14, 150);
      ctx.stroke();
    }

    // 선 스타일 응용
    for (var i = 0; i < 10; i++) {
      ctx.lineWidth = 1 + i;
      ctx.beginPath();

      if (i % 2) {
        ctx.strokeStyle = "sandybrown";
        ctx.moveTo(800 + i * 15, 20);
        ctx.lineTo(800 + i * 15, 180);
      } else {
        ctx.strokeStyle = "crimson";
        ctx.moveTo(800.5 + i * 15, 20);
        ctx.lineTo(800.5 + i * 15, 180);
      }
      ctx.stroke();
    }

    /* 캔버스 칠하기: 그라디언트 */
    // (a, b, c, d) => (a, b)에서 시작해 (c, d)에서 끝나는 선형 그라디언트
    var gradient = ctx.createLinearGradient(0, 200, 200, 400); //그라디언트 생성
    gradient.addColorStop(0, "#c6cff8"); //그라디언트 컬러값(처음)
    gradient.addColorStop(1, "#de89c0"); //그라디언트 컬러값(끝)
    ctx.fillStyle = gradient; //그라디언트로 채우기
    ctx.fillRect(0, 200, 200, 200); //사각형 생성

    //원형 gradient, 중심좌표, 반지름, 중심좌표, 반지름
    const gradient1 = ctx.createRadialGradient(400, 300, 50, 400, 300, 200); //그라디언트 생성
    gradient1.addColorStop(0, "red"); //그라디언트 컬러값(처음)
    gradient1.addColorStop(1, "blue"); //그라디언트 컬러값(끝)
    ctx.fillStyle = gradient1; //그라디언트로 채우기
    ctx.fillRect(300, 200, 200, 200); //사각형 생성

    /* 캔버스 칠하기: 그림자 */
    ctx.fillStyle = "#bfdac9";
    ctx.fillRect(600, 200, 300, 150);
    ctx.shadowOffsetX = 3; // 그림자가 수평으로 얼마나 떨어졌는지
    ctx.shadowOffsetY = 8; // 그림자가 수직으로 얼마나 떨어졌는지
    ctx.shadowBlur = 18; // 흐림 효과의 크기
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.font = "40px Times New Roman";
    ctx.fillStyle = "#fff";
    ctx.fillText("Sample String", 620, 250);
  };

  const drawText = (context: CanvasRenderingContext2D) => {
    // 텍스트 그리기
    context.fillStyle = "black";
    context.font = "24px Arial"; // 폰트 설정
    context.fillText("Hello, Canvas!", 50, 200); // fillText()로 텍스트 그리기
  };

  return (
    <div>
      <h1>Example</h1>
      <Canvas
        draw={drawExample}
        width={window.innerWidth}
        height={BASE_CANVAS_HEIGHT}
      />
      <h1>Applying Styles and Colors</h1>
      <Canvas
        draw={drawStyles}
        width={window.innerWidth}
        height={BASE_CANVAS_HEIGHT * 2}
      />
      <h1>Art</h1>
      <Canvas
        draw={drawArt}
        width={window.innerWidth}
        height={BASE_CANVAS_HEIGHT}
      />
      <h1>Text</h1>
      <Canvas
        draw={drawText}
        width={window.innerWidth}
        height={BASE_CANVAS_HEIGHT}
      />
    </div>
  );
}
