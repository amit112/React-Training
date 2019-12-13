import DoctorM, {
    promote
} from './doctorM';
// 1. Let vs Var 

// var -> function scoped
// let -> block scoped
// const -> block scoped

// eslint-disable-next-line no-unused-vars
function sayHelloUsingVar() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log(i);
}

// eslint-disable-next-line no-unused-vars
function sayHelloUsingLet() {
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
    // uncomment this line to see behaviour of let
    //   console.log(i);
}
// uncomment below two lines to see diffrence between let and var keyword
// sayHelloUsingVar(); // it will work without any error.
// sayHelloUsingLet(); // it will give us error because let is block scoped


// 2. Objects
const student = {
    name: 'amit',
    talk() {
        console.log(this);
    }
}
student.talk();

//3. This Keyword -> this keyword take refrence of current object
const talk = student.talk;
student.talk();
console.log("it has no refrence of this : " + talk());



// 4. Use of bind function ->  bind method enables calling a function with specified 'this' value

const _talk = student.talk.bind(student);
_talk();


//  5. arrow function over normal function  
function getAreaOfCircleNormal(radius) {
    return 3.14 * radius * radius;
}
const getAreaOfCircleArrow = radius => 3.14 * radius * radius;
console.log(getAreaOfCircleNormal(5));
console.log(getAreaOfCircleArrow(5));
const roles = [{
        id: 1,
        name: 'Admin',
        isActive: true
    },
    {
        id: 1,
        name: 'Employee',
        isActive: false
    },
    {
        id: 1,
        name: 'Student',
        isActive: true
    }
]
const activeRolesUsingNormalFunction = roles.filter(function (data) {
    return data.isActive;
})
const activeRolesUsingArrowFunction = roles.filter(data => data.isActive)
console.log(activeRolesUsingNormalFunction);
console.log(activeRolesUsingArrowFunction);

// 6. Arrow functions and this keyword
const employee = {
    walk() {
        setTimeout(() => {
            console.log('this', this);
        }, 500)
    }
}
employee.walk();

// 7. Array map method
const colors = ['red', 'green', 'blue'];
const items = colors.map(x => `<li>${x}$</li>`);
console.log("Array map method: " + items);

// 8. Object Destructing 
const contactDetail = {
    name: 'amit',
    email: 'amitmeena074@gmail.com',
    phoneNumber: '435454545',
    pinCode: '54545'
}
const {
    name,
    email,
    phoneNumber,
    pinCode: pin
} = contactDetail;
console.log(`Object Destructing: - name : ${name}, email : ${email}, phoneNumber : ${phoneNumber}, pin : ${pin}`);


// 9. Spreed Operator 

const arr1 = [1, 2, 3, 4, 3, 2, 4];
const arr2 = [1, 2, 323, 343, 4, 5];
//here we are combining two array 

// using concat function 
const combinedUsingConcat = arr1.concat(arr2);
console.log('Combine using Concat function: ' + combinedUsingConcat);
//using spreed operator  -> here we can also add addtion item in array
const combinedUsingSpreed = [...arr1, 'a', ...arr2, 'b']
console.log('Combine using spreed operator: ' + combinedUsingSpreed);


//here we are combining two objects using spreed oprator;

const obj1 = {
    name: 'amit'
}
const obj2 = {
    address: 'udaipur, india'
}
const combinedObj = {
    ...obj1,
    ...obj2,
    pin: '34344'
}
console.log(combinedObj);


// 10. Classes

class Person {
    constructor(name) {
        this.name = name
    }
    talk() {
        console.log('talk');
    }
}


const _person = new Person('Amit');
console.log(_person);


// 11. Inheritance

class Doctor extends Person {
    constructor(name, degree) {
        super(name);
        this.degree = degree;
    }
    appointment() {
        console.log('appointment');
    }

}
const doctor = new Doctor('Amit', 'Mbbs');
console.log(doctor);



//12. Modules -> sapration of classes in files

const doctorM = new DoctorM('Amit', 'Mbbs');
console.log(doctorM);

//13. Named and default exports 

promote();