import "./index.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import ReactPlayer from "react-player";
import './index.css';

type Props = {};
export default function Home(props: Props) {

   const [text, count] = useTypewriter({
     words: [
       " 샘플 게시판 홈 화면입니다.",
       " 여러 라이브러리를 적용해보고 있습니다.",
       " 별도의 페이지 구성을 생각중입니다."
     ],
     loop: true,
     delaySpeed: 3000,
   });

  return (
    <>
    
      <div
        className="homeVideo"
        style={{
          position: "relative",
          paddingTop:
            "56.25%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */,
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=X-dMOvEOQiM&list=PLQPlg2Vo6yA0_YUDP9WptsszwjX8yUrJY&index=12"
          loop={true}
          playing={true}
          muted={true}
          controls={false}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: "0", left: "0" }}
        />
      </div>

      <p className="homeText">
        {text}
        <Cursor cursorColor="#c54e7e" cursorStyle="|" cursorBlinking={true} />
      </p>
    </>
  );
}