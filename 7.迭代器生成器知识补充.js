// function* read() {
//   console.log("开始了");
//   yield 111;
//   yield 222;
// }
// // it是一个迭代器
// const it = read();
// console.log("it", it);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// ----------------------------

// const obj = {
//   0: 0,
//   1: 1,
//   // 迭代器本质是一个对象，具有next方法，调用返回{value:'',done:true}
//   [Symbol.iterator]: function () {
//     let index = 0;
//     return {
//       next: () => {
//         return {
//           value: this[index],
//           done: index++ === this.length,
//         };
//       },
//     };
//   },
//   length: 2,
// };
// // 我们知道扩展运算符默认是不能和对象是用的
// const res = [...obj];
// console.log("res", res);

// ----------------------------

// const obj = {
//   0: 11,
//   1: 12,
//   // 生成器返回的就是一个迭代器
//   [Symbol.iterator]: function* () {
//     for (let i = 0; i < this.length; i++) {
//       yield this[i];
//     }
//   },
//   length: 2,
// };
// // 我们知道扩展运算符默认是不能和对象是用的
// const res = [...obj];
// console.log("res", res);

// ----------------------------

// function* read() {
//   console.log("开始了");
//   let a = yield "aaa";
//   console.log("a", a);
//   let b = yield "bbb";
//   console.log("b", b);
// }
// const it = read();
// // 第一次next传递的参数没有意义
// console.log(it.next());
// // 会传递给上一次yield的返回值
// console.log(it.next("xxx"));
// console.log(it.next("yyy"));
