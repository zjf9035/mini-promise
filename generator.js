const fs = require("fs").promises;
// function* read() {
//   try {
//     const content = yield fs.readFile("./name1.txt", "utf8");
//     const res = yield fs.readFile(content, "utf8");
//     return res;
//   } catch (error) {
//     console.log("error666", error);
//   }
// }
function* f() {
  yield new Promise(function (resolve, reject) {
    x.toUpperCase();
  }).catch((err) => {
    console.log("err999", err);
  });
}

co(f()).then(
  (data) => {
    console.log("data", data);
  },
  (error) => {
    console.log("err777", error);
  }
);

function co(it) {
  return new Promise((resolve, reject) => {
    let res;
    function next(params) {
      try {
        res = it.next(params);
        console.log("res", res.value);
      } catch (error) {
        return reject(error);
      }
      if (res.done) {
        resolve(res.value);
      } else {
        Promise.resolve(res.value).then(
          (data) => {
            console.log("走成功", data);
            next(data);
          },
          (e) => {
            console.log("走失败");
            try {
              it.throw(e);
            } catch (error) {
              reject(error);
            }
          }
        );
      }
    }
    next();
  });
}
