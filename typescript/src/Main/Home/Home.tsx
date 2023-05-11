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
       " 이거 재밌습니다."
     ],
     loop: true,
     delaySpeed: 3000,
   });

  return (
    <>
      <h1>Home 화면입니다</h1>
      <div className="homeVideo">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=l-B1_h_TQHI"
          width="100%"
          height="100%"
          loop={true}
          playing={true}
          muted={true}
          controls={false}
        />
      </div>
      <p className="homeText" >
        {text}
        <Cursor cursorColor="#c54e7e" cursorStyle="|" cursorBlinking={true} />
      </p>
    </>
  );
}