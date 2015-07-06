/*
Суть данного трюка заключается в создании промежуточного конструктора, который и связывает свойства prototype нужных конструкторов. Помимо этого, можно добавить некоторый “синтаксический сахар” для удобного доступа к конструктору-предку
*/
/*
пример:

function A() {}
A.prototype.x = 10; 
function B() {}
inherit(B, A); // связка прототипов
var b = new B();
alert(b.x); // 10, найдено в A.prototype

*/

function inherit(child, parent) {
  var F = function () {};
  F.prototype = parent.prototype
  child.prototype = new F();
  child.prototype.constructor = child;
  child.superproto = parent.prototype;
  return child;
}

function A(){};
A.prototype.x =10;

function B(){};
inherit(B, A);

B.prototype.y = 20;
B.prototype.foo = function(){
	console.log("B#foo");
}

var b = new B();
console.log(b.x);

function C(){};
inherit(C, B);

C.prototype.foo = function(){
	C.superproto.foo();//.call(this);
	console.log("C#foo");
}

var c = new C();
console.log([c.x, c.y]);
c.foo();