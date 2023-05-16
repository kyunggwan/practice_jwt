import { useState, useReducer, FunctionComponent } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import "./index.css";

type Props = {};

// 타입1 세팅
type Student = {
  idx?: number;
  name?: string;
}

// 타입1로 타입2 세팅
type State = {
  students: Student[];
}

// 초기값 세팅(타입2)
const initialSchoolState: State = {
  students: [],
};

// 행동 부속세팅
enum ActionKind{
  ADD_STUDENT = "ADD_STUDENT",
  DEL_STUDENT ="DEL_STUDENT",
  DEL_ALL = "DEL_ALL",
}

// 행동 세팅
type Action = {
  type: ActionKind;
  payload: Student;
};

const reducer = (state: State, action: Action): State => {
  console.log(state);
  switch (action.type) {
    case ActionKind.ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case ActionKind.DEL_STUDENT: {
      return {
        ...state,
        students: [
          ...state.students.filter((s) => s.idx !== action.payload.idx),
        ],
      };
    }
    case ActionKind.DEL_ALL:
      return { ...state, students: [] };
    default:
      throw new Error();
  }
};

const Home: FunctionComponent<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialSchoolState);
  const { students } = state;

  const [text, count] = useTypewriter({
    words: [
      " 샘플 게시판 홈 화면입니다.",
      " 여러 라이브러리를 적용해보고 있습니다.",
      " 별도의 페이지 구성을 생각중입니다.",
    ],
    loop: true,
    delaySpeed: 3000,
  });

  return (
    <>
      <h1>useReducer 연습, 학생 수</h1>
      {students.map((st) => {
        return <div key={st.idx}> {st.name} </div>;
      })}
      <br />
      <button
        onClick={() =>
          dispatch({
            type: ActionKind.ADD_STUDENT,
            payload: {
              idx: state.students.length + 1,
              name: "학생-" + state.students.length,
            },
          })
        }
      >
        학생추가
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ActionKind.DEL_STUDENT,
            payload: { idx: state.students.length },
          })
        }
      >
        학생삭제
      </button>
      <button
        onClick={() => dispatch({ type: ActionKind.DEL_ALL, payload: {} })}
      >
        학생 전체 삭제
      </button>

      <p className="homeText">
        {text}
        <Cursor cursorColor="#c54e7e" cursorStyle="|" cursorBlinking={true} />
      </p>
    </>
  );
};

export default Home;
