import axios from "axios";

export const signInApi = async (data) => {
  const response = await axios
    .post("http://localhost:4000/api/auth/signIn", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const signUpApi = async (data) => {
  const response = await axios
    .post("http://localhost:4000/api/auth/signUp", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const boardApi = async (data) => {
  const response = await axios
    .get("http://localhost:4000/api/board/", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const boardListApi = async (data) => {
  const response = await axios
    .get("http://localhost:4000/api/user/list", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const userListApi = async (data) => {
  const response = await axios
    .get("http://localhost:4000/api/user/", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const userPatchApi = async (data) => {
  const response = await axios
    .put(`http://localhost:4000/api/user/patch/${data.userEmail}`, data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};




//   // 토큰이 만료되었을 때 자동으로 토큰 갱신
//   instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       const {
//         config,
//         response: { status },
//       } = error;

//       const originalRequest = config;

//       if (status === 401) {
//         const accessToken = sessionStorage.getItem("accessToken");
//         const refreshToken = sessionStorage.getItem("refreshToken");

//         try {
//           const { data } = await axios({
//             method: "post",
//             url: "http://localhost:4000/api/auth/reIssue",
//             data: { accessToken: accessToken, refreshToken: refreshToken },
//           });
//           console.log(data);
//           const newAccessToken = data.accessToken;
//           const newRefreshToken = data.refreshToken;

//           originalRequest.headers = {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + newAccessToken,
//           };
//           sessionStorage.setItem("accessToken", newAccessToken);
//           sessionStorage.setItem("refreshToken", newRefreshToken);
//           return await axios(originalRequest);
//         } catch (err) {
//           new Error(err);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
//   return instance;
// };
