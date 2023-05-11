import AuthInstance from "../IndexApi";
import axios from "axios";

// export const userListApi = async () => {
//   try {
//     const { data } = await AuthInstance().get("/member/");
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

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
  // console.log("userapi")
  // console.log(result);
  return result;
};

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