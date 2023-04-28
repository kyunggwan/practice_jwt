import { NotAuthInstance, AuthInstance } from "./indexAPI";
//생성된 axios인스턴스를 사용해 API호출

//회원가입
export const signUpApi = async (requestBody) => {
  try {
    const { data } = await NotAuthInstance.post("api/auth/signUp", requestBody);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//login
export const signInApi = async (requestBody) => {
  try {
    const { data } = await NotAuthInstance.post("api/auth/signIn", requestBody);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//login - return yes
export const getSearchResults = async (requestBody) => {
  try {
    const { data } = await AuthInstance.post("search", requestBody);
    return data
  } catch (error) {
    console.error(error)
  }
}


// api/user// 검색

// export const findUserApi = async (requestBody) => {
//   try {
//     const { data } = await AuthInstance.get("api/user/", requestBody);
//     return data
//   } catch (error) {
//     console.error(error);
//   }
// };
