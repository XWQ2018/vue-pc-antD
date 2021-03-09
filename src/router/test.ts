interface Lengthwise {
  length: number;
}

function say<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
console.log(say(1)); // Argument of type '1' is not assignable to parameter of type 'Lengthwise'.
console.log(say({ value: "hello vue!", length: 10 }));

interface foo {
  x: number;
}
interface bar {
  b: number;
}
interface lar {
  c: number;
  d: number;
}
type intersection = bar & foo & lar;
const result: intersection = {
  x: 10,
  b: 20,
  c: 55,
  d: 555
};
const result1: intersection = {
  x: 10,
  b: 55
};
interface vali {
  a: number;
  b: number;
}
function sum<T, S>(a: T, b: S): [T, S] {
  return [a, b];
}

const test = sum(55, "33");

interface vali {
  a: number;
  b: number;
}

export default function({ a, b }: vali): number {
  return a + b;
}

// 泛型多类型
function getUser(x: any, y: number): any[] {
  const arr: any[] = [];
  for (let i = 0; i < y; i++) {
    arr.push(x);
  }
  return arr;
}
const res = getUser(11, 5);
const res1 = getUser("555", 5);
console.log(res);
res[0].toFixed(2); //对结果有代码提示功能
console.log(res1);

function getUser2<T, S>(x: T, y: S): [T, S] {
  return [x, y];
}
const resu = getUser2(11, 22);
const resu1 = getUser2("555", 22);
console.log(resu);
res[0].toFixed(2); //对结果有代码提示功能
console.log(resu1);

// 泛型 any
// 泛型多类型
function getUserInfo(x: string, y: number): any {
  return [x, y];
}
const res3 = getUserInfo("555", 22);
console.log(res3);
res3[0].split(""); //对结果操作时没有代码提示功能
