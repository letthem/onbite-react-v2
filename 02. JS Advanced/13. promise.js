function add10(num) {
  const promise = new Promise(() => {
    // 비동기 작업 실행하는 함수 = executor

    setTimeout(() => {
      if (typeof num === "number") {
        resolve(num + 10);
      } else {
        reject("num이 숫자가 아닙니다");
      }
    }, 2000);
  });

  return promise;
}

add10(0)
  .then((result) => {
    console.log(result); // 10
    return add10(result); // 새로운 promise 객체 반환 가능 -> 콜백 지옥 막기!
  })
  .then((result) => {
    console.log(result); // 20
  })
  .then((result) => {
    console.log(result); // 30
  })
  .catch((error) => {
    console.log(error); // num이 숫자가 아닙니다
  });
