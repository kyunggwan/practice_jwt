import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
//axios 인스턴스 생성
const BASE_URL = "http://localhost:4000/api";

//비인가 통신
const axiosAPI = (url: string, options?: any) => {
  const instance = axios.create({ baseURL: url, ...options });
  
  return instance;
};

//인가 통신
const AxiosAuthAPI = (url: string, accessToken?: any, options?: any) => {
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${accessToken}` }, 
    ...options,
  });

  // 토큰이 만료되었을 때 자동으로 토큰 갱신
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      const originalRequest = config;

      if (status === 401) {
       const accessToken = cookies.accessToken;
       const refreshToken = cookies.refreshToken;

        try {
          const { data } = await axios({
            method: "post",
            url: "http://localhost:4000/api/auth/reissue",
            data: { accessToken: accessToken, refreshToken: refreshToken },
          });
          console.log(data);
         const newAccessToken = data.accessToken;
         const newRefreshToken = data.refreshToken;

          originalRequest.headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + newAccessToken,
          };
          sessionStorage.setItem("accessToken", newAccessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);
          return await axios(originalRequest);
        } catch (err: any) {
          new Error(err);
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const NotAuthInstance = axiosAPI(BASE_URL);
const AuthInstance = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    if (cookies.accessToken) {
      setAccessToken(cookies.accessToken);
    }
  }, [cookies.accessToken]);
  console.log(accessToken);
  const authInstance = AxiosAuthAPI(BASE_URL, accessToken);

  return authInstance;
};

export default AuthInstance;