const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {
  let called = false;
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        // 认为x就是一个promise了
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // {then:1}
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x是一个普通值
    if (called) return;
    called = true;
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];

    let resolve = (value) => {
      //  防止成功之后又去调用失败reject
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        this.onResolvedCallback.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    // 如果执行时发生错误，等价于执行reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === "function" ? onfulfilled : (data) => data;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : (error) => {
            throw error;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        // 这里是无法直接拿到promise2,因为是先new Promise，然后才把结果赋值给promise2,所以需要变成异步才能拿到promise2
        // 又因为onfulfilled放到了异步里面，trycatch无法捕获异步，所以这里也要加上trycatch
        setTimeout(() => {
          try {
            // x可能是普通值或者是一个promise
            let x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // x可能是普通值或者是一个promise
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      // 例如executor 里面有一个setTimeout，在定时器里面执行的resolve或者reject。
      // 这个时候then，状态还是PENDING，先把then里面的方法存起来，等定时器执行之后/状态改变之后再执行then里面的函数
      if (this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              // x可能是普通值或者是一个promise
              let x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              // x可能是普通值或者是一个promise
              let x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
