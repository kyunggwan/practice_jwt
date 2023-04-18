// import axios from "axios";

// //axios 인스턴스 생성
// const BASE_URL = "http://localhost:8080/";

// //비인가 통신
// const axiosAPI = (url, options) => {
//   const instance = axios.create({ baseURL: url, ...options });
//   return instance;
// };

// //인가 통신
// const axiosAuthAPI = (url, options) => {
//   const token = sessionStorage.getItem("accessToken") || "";
//   const instance = axios.create({
//     baseURL: url,
//     headers: { Authorization: `Bearer ${token}` }, //bearer를 사용하는건 암묵적 약속
//     ...options,
//   });

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
//             url: "http://localhost:8080/api/auth/reissue",
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

// export const NotAuthInstance = axiosAPI(BASE_URL);
// export const authInstance = axiosAuthAPI(BASE_URL);
