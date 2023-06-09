import { NotAuthInstance } from "../IndexApi";
import axios from "axios";

// 회원가입
export const signUpApi = async (requestBody: any) => {
  try {
    const { data } = await NotAuthInstance.post("/auth/signUp", requestBody);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// login
export const signInApi = async (requestBody: any) => {
  try {
    const { data } = await NotAuthInstance.post("/auth/signIn", requestBody);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 비밀번호 찾기에서 email 체크
export const checkEmailApi = async (email: string) => {
  try {
    const { data } = await NotAuthInstance.get(`/auth/${email}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("오류가 발생했습니다. 다시 시도해주세요.");
  }
};




