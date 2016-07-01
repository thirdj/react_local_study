









Q.
function Hello(name) {
  this.name = name;
}

Hello.prototype.hello = function hello() {
  return 'Hello ' + this.name + '!';
};

Hello.sayHelloAll = function () {
  return 'Hello everyone!';
};

function HelloWorld() {
  Hello.call(this, 'World');
}

HelloWorld.prototype = Object.create(Hello.prototype);

HelloWorld.prototype.echo = function echo() {
  alert(Hello.prototype.hello.call(this));
};

var hw = new HelloWorld();
hw.echo();

alert(Hello.sayHelloAll());


A.
class Hello {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return 'Hello ' + this.name + '!';
  }

  static sayHelloAll() {
    return 'Hello everyone!';
  }
}

class HelloWorld extends Hello {
  constructor() {
    super('World');
  }

  echo() {
    alert(super.hello());
  }
}

var hw = new HelloWorld();
hw.echo();

alert(Hello.sayHelloAll());





function Hello(name) {
  this.name = name;
}
Hello.prototype.hello = function hello() {
  return 'Hello ' + this.name + '!';
};

Hello.sayHelloAll = function () {
  return 'Hello everyone!';
};


class Hello {
  constructor(name){
    this.name = name;
  }
  hello = () => `Hello ${this.name} !`;
  sayHelloAll() => 'Hello everyone!';
}

class HelloWorld extends Hello {
  constructor(){
    super();
  }
  Hello.super(this, 'Wolrd');
  echo() {
    alert(Hello.super().hello())
  }
}
const hw = new HelloWorld();
hw.echo();

alert(Hello.sayHelloAll());

------------

function HelloWorld() {
  Hello.call(this, 'World');
}

HelloWorld.prototype = Object.create(Hello.prototype);

HelloWorld.prototype.echo = function echo() {
  alert(Hello.prototype.hello.call(this));
};

var hw = new HelloWorld();
hw.echo();

alert(Hello.sayHelloAll());










const { foo, bar } = { foo: 'lorem', bar: 'ipsum' };
const [ a, b, c ] = [ 1, 2, 3 ];

[1, 2, 3].map(n => n * 2);

const person = 'Addy Osmani';
console.log(`Yo! My name is ${person}!`);

function greet(msg = 'hello', name = 'world') {
  console.log(msg, name);
}

function getPoint() {
  const x = 1;
  const y = 10;
  return { x, y };
}

function f(x, ...y) {
  return x * y.length;
}

-----------
var foo = 'lorem';
var bar = 'ipsum';

var a = 1;
var b = 2;
var c = 3;

[1, 2, 3].map(function(n) {
  return n * 2;
});

var person = 'Addy Osmani';
console.log('Yo! My name is' + person + '!');

function greet(msg = 'hello', name = 'world') {
  if (arguments[0] == undefined) { arguments[0] = 'hello'; }
  if (arguments[1] == undefined) { arguments[1] = 'world'; }
  console.log(arguments[0], arguments[1]);
}

function getPoint() {
  var x = 1;
  var y = 10;
  return {x: x, y: y};
}

function f(x, arguments) {
  return x * arguments.length;
}















<body>
    <div class="new-status">
        <h2>New monolog</h2>
        <form action="">
            <textarea></textarea><br>
            <input type="submit" value="Post">
        </form>
    </div>

    <div class="statuses">
        <h2>Monologs</h2>
        <ul></ul>
    </div>

    <script>
    const $ = require('jquery');
    $(document).ready(function() {
        $('.new-status form').submit(function(e) {
            e.preventDefault();

            $.ajax({
                url: '/status',
                type: 'POST',
                dataType: 'json',
                data: { text: $('.new-status').find('textarea').val() },
                success: function(data) {
                    $('.statuses').append('<li>' + data.text + '</li>');
                    $('.new-status').find('textarea').val('');
                }
            });
        });
    });
    </script>
</body>














시험 리뷰

arrow function new 할 수 없음.
error 남.

function f(x, y) {
var args = Array.prototype.slice.call(arguments);
args.shift();
return x * args.length;
}

unicode == emoticon… 같은 느낌

super();
상속을 받은 자식 클래스가 부모의 this를 사용 하고 싶을 때 사용

static ?
static Hello.sayHelloAll()

class 에 대한 이해를 높이면 좋겠다.

singletone 은 중복코드가 많이 나올 수 있다.

var a = x => x * 2;
a.constructor => Function

oop 의 this 는 depth 로 바라 봄.
일반적으로 this 는 window 가 있음.
arrow function 에서는 new 가 안됨.

return x * (arguments - 1);

reflect
  reflection..?
  ?? 잘 모르겠다... 아직도..
Proxies
  다른 객체를 감싸 줌. ?? 무슨 말이지... 이해가 잘 안 됨.

Object spread -> es7 에 들어옴.
  var a = {a: 1}, b = {b: 2};
  var c = {...a, ...b};
  psyclone 에서는 obj spread 할 수 있게 라이브러리를 끌어다 쓰고 있음.

Unicode 문자 코드

Subclassable ?

react componentWillMount -> es6 constructor 에서 작동 함

전/직후 로 확인 하 면 됨.
componentDidMount   -> 컴포넌트가 마운트 되기 전 호출.
componentWillMount  -> 컴포넌트가 마운트 되고 난 직 후 호출.
componentDidUpdate  -> 컴포넌트가 업데이트 되기 전 호출.
componentWillUpdate -> 컴포넌트가 업데이트 되고 난 직 후 호출.

ipc -> Intercal Procedure Call
  일렉트론 내부의 서로다른 프로세스 간의(메인<->렌더)
  메소드 호출을 이용 할 수 있도록 제공하는 통신 API

  RPC: Remote Procedure(Method) Call
  js method 를 직접 콜 하기 때문에 ipc 라고 하는 것 같음?

메인 프로세스와 렌더러 프로세스 차이점
  메인
    플랫폼에서 제공 하는 API
  렌더
    뷰 를 만들고
    OS API 를 콜 할 수 있다.

Electron
  asar 아카이브 복호화 가능함
  Menu API 는 Main 에서 동작 함.
  Win platform 은 Win 7 이후 만 동작함 Mac은 64비트 바이너리 만 제공 하진 않음.
