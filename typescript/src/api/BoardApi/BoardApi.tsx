import axios from "axios";

export const BoardListApi = async () => {
  const response = await axios
    .get("http://localhost:4000/api/board/list")
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const GetBoardApi = async (data: number) => {
  const response = await axios
    .get(`http://localhost:4000/api/board/${data}`)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const BoardCreateApi = async (data: any) => {
  const response = await axios
    .post("http://localhost:4000/api/board/", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const BoardUpdateApi = async (data: any) => {
  const response = await axios
    .patch("http://localhost:4000/api/board/", data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};

export const BoardDeleteApi = async (data: number) => {
  const response = await axios
    .delete(`http://localhost:4000/api/board/${data}`)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};