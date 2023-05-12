import { NotAuthInstance } from "../IndexApi";

//회원가입
export const signUpApi = async (requestBody: any) => {
  try {
    const { data } = await NotAuthInstance.post("/auth/signUp", requestBody);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//login
export const signInApi = async (requestBody: any) => {
  try {
    const { data } = await NotAuthInstance.post("/auth/signIn", requestBody);
    return data;
  } catch (error) {
    console.error(error);
  }
};

