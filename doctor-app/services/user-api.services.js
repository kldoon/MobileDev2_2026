/*
const getUsers = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      return res.json()
        .then(data => {
          return data;
        });
    })
}
*/

const getUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data;
}

export {
    getUsers
}