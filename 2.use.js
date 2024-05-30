const Promise = require("./promise");
const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject("异步执行失败");
  //   }, 0);
  resolve("promise执行了");
});
promise.then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);
promise.then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);
promise.then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);

console.log("执行结束");
