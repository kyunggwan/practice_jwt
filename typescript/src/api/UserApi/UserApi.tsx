import AuthInstance from "../IndexApi";

export const userListApi = async () => {
  try {
    const { data } = await AuthInstance().get("/member/");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};