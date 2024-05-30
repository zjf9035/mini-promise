new Promise((resolve, reject) => {
  resolve(123);
})
  .then()
  .then()
  .then((data) => {
    console.log(data);
  });

new Promise((resolve, reject) => {
  reject(123);
})
  .then()
  .then()
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log("执行错误");
      console.log(err);
    }
  );
