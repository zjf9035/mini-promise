// 1）promise里面有三个状态，等待、成功、失败。一旦成功就不能失败，反过来也一样
// 2) 每个promise实例都有一个then方法
// 3) 如果new Promise的时候报错了，会变成失败态(抛错也算失败)

const Promise = require("./promise");

const promise = new Promise((resolve, reject) => {
  console.log("开始执行");
  throw new Error("失败了");
}).then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);
