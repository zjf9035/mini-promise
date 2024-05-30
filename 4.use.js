const Promise = require("./promise");
const p = new Promise((resolve, reject) => {
  resolve(100);
});
const promise2 = p.then(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 1000);
  });
});
promise2
  .then((data) => {
    console.log("data", data);
  })
  .then((data) => {
    console.log("s", data);
  });
