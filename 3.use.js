// 链式执行，then里面的结果(如果是promise则会将promise的状态传递给下一个then，如果不是promise则会将它包装成promise传递给下一个then)
// then(onfulfilled,onrejected),onrejected里面只要没有调用reject则又会走到下一个成功
// new Promise((resolve,reject)=>{}).then(fn1,fn2)不会卡死，只会什么都不做。这样就能做到即不走fn1也不走fn2
const promise = new Promise((resolve, reject) => {
  console.log("开始执行");
  reject("111");
})
  .then(
    (data) => {
      return new Promise((resolve, reject) => {
        resolve("222");
      });
    },
    (error) => {
      console.log(error);
      return new Promise((resolve, reject) => {});
    }
  )
  .then(
    (data) => {
      console.log("data", data);
    },
    (error) => {
      console.log(error);
    }
  );
console.log("结束");
