import { NotAuthInstance, authInstance } from "./indexAPI";
//생성된 axios인스턴스를 사용해 API호출

//회원가입
export const signupAPI = async (requestBody) => {
  try {
    const { data } = await NotAuthInstance.post("api/auth/signUp", requestBody);
    return data
  } catch (error) {
    console.error(error)
  }
}

//login
export const signInAPI = async (requestBody) => {
  try {
    const { data } = await NotAuthInstance.post("api/auth/signIn", requestBody);
    return data
  } catch (error) {
    console.error(error)
  }
}

//login - return yes
export const getSearchResults = async (requestBody) => {
  try {
    const { data } = await authInstance.post(
        "search",
        requestBody
      )
    return data
  } catch (error) {
    console.error(error)
  }
}

// //login - return no
// export const addBasket = async (requestBody) => {
//   try {
//     const { data } = await authInstance.post(
//         "addbasket",
//         requestBody
//       )
//     return data
//   } catch (error) {
//     console.error(error)
//   }
// }