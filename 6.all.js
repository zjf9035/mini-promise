// promise.all输出的结果是按照顺序来的，输出结果中只要有一个失败了就失败
// Promise.all([1, 3, 5, "hello", Promise.resolve("world"), 10]).then((data) => {
//   console.log(data);
// });
// const Promise = require("./promise");

Promise.all = function (values) {
  const arrs = [];
  let index = 0;
  function isPromise(value) {
    if (
      (typeof value === "object" && value !== null) ||
      typeof value === "function"
    ) {
      if (typeof value.then === "function") {
        return true;
      }
    } else {
      return false;
    }
  }
  return new Promise((resolve, reject) => {
    function processData(key, v) {
      index += 1;
      arrs[key] = v;
      if (index === values.length) {
        resolve(arrs);
      }
    }
    for (let i = 0; i < values.length; i++) {
      const current = values[i];
      if (isPromise(current)) {
        current.then((data) => {
          processData(i, data);
        }, reject);
      } else {
        processData(i, current);
      }
    }
  });
};

Promise.all([1, 3, 5, "hello", Promise.resolve("world"), 10]).then((data) => {
  console.log(data);
});
