export default function getOrders(): Promise<any> {
  return fetch("https://dummyjson.com/carts")
    .then((res) => res.json())
    // .then(console.log);
}
