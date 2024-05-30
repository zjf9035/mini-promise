// async function f() {
//   try {
//     await new Promise(function (resolve, reject) {
//       throw new Error("出错了");
//     });
//   } catch (e) {
//     console.log("e222", e);
//   }
// }

// f()
//   .then((v) => console.log(v))
//   .catch((e) => console.log("e3333", e));

// ---------------------------

// function* f() {
//   try {
//     yield x.toUpperCase();
//   } catch (e) {
//     console.log("e222", e);
//   }
// }

// const it = f();
// try {
//   const res = it.next();
//   console.log("执行2", res);
// } catch (error) {
//   console.log("error-xxx", error);
// }

// --------------------------

// async function f() {
//   await new Promise(function (resolve, reject) {
//     throw new Error("出错了");
//   });
// }

// f().then(
//   (v) => console.log(v),
//   (e) => {
//     console.log("e8787", e);
//   }
// );

// ------------------------------------

// async function myFunction() {
//   await new Promise(() => {
//     x.toUpperCase();
//   }).catch(function (err) {
//     console.log("err123", err);
//   });
// }
// myFunction().then(
//   (data) => {
//     console.log("data", data);
//   },
//   (e) => {
//     console.log("e456", e);
//   }
// );

// ---------------------------------------

const existingPromise = new Promise((resolve, reject) => {
  reject("already rejected");
});
Promise.resolve(existingPromise).then(
  (value) => console.log("value11", value),
  (err) => {
    console.log("err", err);
  }
); // 输出: already resolved
