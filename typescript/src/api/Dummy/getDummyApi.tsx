// 이렇게 보내면 import getOrders from ~
export const getOrders = (): Promise<any> => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
  // .then(console.log);
};
export default getOrders;

// 이렇게 보내면 import { getRevenue } from ~
export const getRevenue = (): Promise<any> => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
  // .then(console.log);
};

export const getInventory = (): Promise<any> => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
  // .then(console.log);
};

export const getComments = (): Promise<any> => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
  // .then(console.log);
};