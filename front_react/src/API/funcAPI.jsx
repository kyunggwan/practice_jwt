import { NotAuthInstance, authInstance } from "./indexAPI";
//생성된 axios인스턴스를 사용해 API호출

//회원가입
export const signup = async (requestBody) => {
  try {
    const { data } = await NotAuthInstance.post(
        "/auth/signup",
        requestBody
      )
    return data
  } catch (error) {
    console.error(error)
  }
}

//login
export const login = async (requestBody) => {
  try {
    const { data } = await NotAuthInstance.post(
        "/auth/login",
        requestBody
      )
    return data
  } catch (error) {
    console.error(error)
  }
}