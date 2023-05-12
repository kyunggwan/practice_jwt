import AuthInstance from "../IndexApi";
import axios from "axios";

export const userListApi = async (data: any) => {
  const response = await axios
    .get("http://localhost:4000/api/member/", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  // console.log("userapi")
  // console.log(result);
  return result;
};

export const userUpdateApi = async (data: any) => {
  const response = await axios
    .put("http://localhost:4000/api/admin/updateuser", data)
    .catch((error) => null);
  console.log(response);
  if (!response) return null;

  const result = response.data;
  console.log("userUpdateApi Response");

  console.log(result);
  return result;
};

// 로그인한 유저의 본인 정보 확인 api
export const myInfoApi = async (data: any) => {
  const response = await axios
    .get("http://localhost:4000/api/member/me", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

// export const myInfoApi = async () => {
//   try {
//     const { data } = await AuthInstance.get("/member/");
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

/* 회원 탈퇴 api */
// export const deleteUserApi = async (id: number) => {
//   try {
//     const { data } = await AuthInstance().delete(`/member/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
/* 회원 탈퇴 api */
export const deleteUserApi = async (id: number, data: any) => {
  const response = await axios
    .delete(`http://localhost:4000/api/member/${id}`, data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  // console.log("userapi")
  // console.log(result);
  return result;
};

/* 비밀번호 변경 api */
export const passwordEditApi = async (data: any, requestOption: any) => {
  console.log(data);
  console.log(requestOption);

  const response = await axios
    .put(`http://localhost:4000/api/member/password`, data, requestOption)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

// export const passwordEditApi = async (data: any, requestOption: any) => {
//   try{
//     const {data} = await AuthInstance().get("/member/password");
//     return data;
//   } catch(error){
//     console.log(error);
//   }

// };
