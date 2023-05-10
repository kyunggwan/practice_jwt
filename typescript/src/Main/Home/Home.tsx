import "./index.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";

type Props = {};
export default function Home(props: Props) {

   const [text, count] = useTypewriter({
     words: [
       " 홈 화면 입니다.",
       " 여러 라이브러리를 적용해보고 있습니다.",
       " 이거 재밌습니다."
     ],
     loop: true,
     delaySpeed: 3000,
   });

  return (
    <>
      <h1>Home 화면입니다</h1>
      <p>
        {text}
        <Cursor cursorColor="#c54e7e" cursorStyle="|" cursorBlinking={true} />
      </p>
    </>
  );
}