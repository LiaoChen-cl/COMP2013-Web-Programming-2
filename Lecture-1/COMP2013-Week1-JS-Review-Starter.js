/* 
Course: COMP2004
Author: Ziad Ewais
Title: COMP2004-Week1-JS-Review-Answers
Synopsis: Welcome to week 1 of COMP2004 - Full Stack Dev.
To start on the right foot we need to review the JavaScript
required to develop in React. 
*/

/*
*1
JavaScript Objects are a collection data structure where data are defined by "Key" and "Value"
Keys are a string followed by a colon (:)
Values can be any JavaScript data type (String, number, boolean, collection, ...)
*/
let data = [
  {
    id: 1,
    studentName: "John Doe",
    dateOfBirth: "2002-05-11",
    tuitionPaid: 12600,
    program: "General Arts and Science",
    highSchool: "West Andrews HS",
    courses: ["MATH8", "CHEM12", "COMP205", "COMM110", "GENE200"],
    hasAttendedOrientation: true,
    previousCoursesGrades: {
      COMP101: 95,
      GENE101: 66,
      CHEM11: 85,
      COMM20: 45,
    },
  },
  {
    id: 22,
    studentName: "Shrey Gupta",
    dateOfBirth: "2003-11-23",
    tuitionPaid: 10200,
    program: "Welding",
    highSchool: "Toronto Heights HS",
    courses: ["MATH8", "WELD12", "WELD205", "CARP55", "GENE101"],
    hasAttendedOrientation: true,
    previousCoursesGrades: {
      COMP101: 78,
      WELD101: 86,
      PHYS20: 55,
      COMM20: 0,
    },
  },
  {
    id: 3,
    studentName: "Veronica Martinez",
    dateOfBirth: "2002-10-04",
    tuitionPaid: 11300,
    program: "Computer Systems Technician",
    highSchool: "St. James HS",
    courses: ["COMP905", "COMP1100", "CARE10", "GENE66", "GENE12"],
    hasAttendedOrientation: false,
    previousCoursesGrades: {
      COMP101: 95,
      COMP1000: 88,
      GENE102: 68,
      COMM110: 75,
    },
  },
  {
    id: 4,
    studentName: "Jana Mohammed",
    dateOfBirth: "2003-02-16",
    tuitionPaid: 15900,
    program: "Automotive",
    highSchool: "INTERNATIONAL",
    courses: ["AUTO102", "AUTO102", "MATH8", "GENE101", "COMM110"],
    hasAttendedOrientation: true,
    previousCoursesGrades: {},
  },
];

const newerStudent = {
  id: 5,
  studentName: "Alice",
  dateOfBirth: "2004-07-15",
  tuitionPaid: 1000,
  program: "General Arts",
  highSchool: "Central HS",
  courses: [],
  hasAttendedOrientation: false,
  previousCoursesGrades: {}
};

data = [...data, newerStudent];
console.log(data);


//to make sure data is mutable




const student0 = data[0]
console.log(student0)
console.log(student0.studentName)
console.log(student0["id"])
const key0 = "tuitionPaid"
console.log(student0[key0])
const keys = ["highSchool", "program", "dateOfBirth"]
for(let i=0; i < keys.length; i++){
  console.log(student0[keys[i]])
}
/* 
*2
To access data inside an object, we use the dot notation, or the square brackets notation
*/

/*3
To add or change data in an object we call the key and assign a value to it
*/
console.log(student0.highSchool) //dot notation
student0.highSchool = "New High School";
console.log(student0["highSchool"]) //square brackets notation
student0["hasAttendent"] = false;
/*
*4
Deconstruction of an object creating variables with same studentNames of keys with the assigned values 
 */
//let id = student0.id
//let studentName = student0.studentName
//let dateOfBirth = student0.dateOfBirth

//let {id, studentName, dateOfBirth} = student0
//console.log(id)
//console.log(studentName)
//console.log(dateOfBirth)
/*
 *5
Rest operator (...) is used to assign the rest of the data to a new object
 */
let {id, studentName, dateOfBirth, ...restOfstudent} = student0
console.log(id)
console.log(studentName)
console.log(dateOfBirth)
console.log(restOfstudent)
/**
 *6
 Spread operator (...) to spread keys of an object in a new object
 */
const deepCopy = {...student0};
const shallowCopy = student0;
student0.id = 123456
console.log(shallowCopy.id) //123456
console.log(deepCopy.id) //1
const {tuitionPaid, ...copyExceptTuitionPaid} = student0;
console.log(copyExceptTuitionPaid)

/** 
 *7
 Template literals is creating strings with JS code embedded like variables or statements
 using back tick (`) operator
 */



let message = `Student ${studentName} was born on ${dateOfBirth} and has paid $${tuitionPaid} in tuition.`;

/**
 *8
 * Arrow function is used to replace the old function declaration. Best used for one liner functions (lambda functions)
 */
function oldFunction(){
  console.log("This is the old function")
}



const arrowFunction = () => { 
  console.log("This is the arrow function")
}
const lambdaFunction = () => console.log("This is the lambda function")

console.log(lambdaFunction())
//old function declaration method
function oldFunction2(){
  console.log("This is the old function 2")
}
oldFunction2();
//arrow function declaration method
const arrowFunction2 = (num1, num2) => { 
  return num1 + num2;
};
console.log(arrowFunction2(5, 6)) //11
//Lambda function declaration method
const lambdaFunction2 = (num1, num2) => num1 + num2
console.log(lambdaFunction2(5, 6)) //11
/**
 *8
 Ternaries are short, one liners, if/else statements 
 */
if (student0.tuitionPaid > 10000) {
  console.log("They are paying too much");
}else {
  console.log("They are paying a reasonable amount");
}

let result = (student0.tuitionPaid > 10000) ? "They are paying too much": "They are paying a reasonable amount"
console.log(result)
//if they have comp205 in their course then we will say have the correct courseload
//else we need to add COM205 to their courseload and put amessage saying out we add comp205

let courseLoadChecker = (student0.courses).includes("COMP205")? "They have the correct courseload" : (
  (student0.courses).push("COMP205"),
  console.log("We have added COMP205 to their courseload")
);

//if(condition){
//  if(another condition){
//    }else{
//    }
//}else{
//}


let tuitionRangeChecker = 
  student0.tuitionPaid > 10000
    ? (student0.tuitionPaid < 15000
        ? "They are paying too much"
        : "They are paying a reasonable amount")
    : "They are not paying enough";


/**
 *9
 Short circuting with &&, ||, ?? operators
 NOTE: Falsy values are (false, 0 (the number zero), empty string, undefined, NaN, null)
 */

 let tuitionChecker = student0.tuitionPaid > 10000 && "They have paid their tuition";
console.log(tuitionChecker) 





// 2. 检查是否包含 MATH12
console.log(student0.courses.includes("MATH12") || "MATH12 is not required");
// 如果包含 → 输出 true （因为 includes 返回布尔值）
// 如果不包含 → 输出 "MATH12 is not required"



if (student0.previousCoursesGrades.COMM20 === 0) {
  console.log("They don't have a mark");
}

console.log(student0.previousCoursesGrades.COMM20 === 0 && "They don't have a mark");



// 3. COMM110 成绩检查
console.log(student0.previousCoursesGrades.COMM110 === 0 && 
  "They scored a zero on their COMM course"
);
// 如果 COMM110 等于 0 → 输出 "They scored a zero on their COMM course"
// 如果不是 0 → 输出 false

console.log((student0.previousCoursesGrades.cOMM28 === 8) ?? "They got a zero");

let thisIsANu1l; // undefined
console.log(thisIsANu1l ?? "This variable is null");
// 输出： "This variable is null"


//to solve this issue we use the Nullish coalescing operator

/**
 *10
 Array map: To change all the values of an array at once using a statement
 stored in a new collection (array or object)
 */

const numArray = [1,2,3,4,5]
const numArrayMultipliedBy5 = []
for (let i = 0; i < numArray.length; i++){
  numArrayMultipliedBy5.push(numArray[i] * 5)
}
console.log(numArrayMultipliedBy5)

const numArrayWithMap = numArray.map( (num) => num * 5 );
console.log(numArrayWithMap)

const dataWithGraduated  = data.map((stud) => ({...stud, graduated: false}))


//to get all students names in a new array

/**
 *11
 Array filter: to filter certian data in regarded to a statement stored in a new collection
 */

//Filter all students born in 2002 using filter and includes method
const studentsBornIn2002 = data.filter( (stud) => (stud.dateOfBirth).includes("2002") )
console.log(studentsBornIn2002)

const dataWithTuitionPaidMoreThan12000 = data.filter(
  (stud) => stud.tuitionPaid > 12000
);
console.log(dataWithTuitionPaidMoreThan12000);
/**
 *12
    Array reduce: To reduce an array to a single value 
    Ex: display the total of all students tuition paid
 */
const totalTuitionPaid = data.reduce(
  (total, stud) => total + stud.tuitionPaid, 
  0
);

//confirmButton


//the reduce method takes two parameters, the first is a callback function and the second is the initial value.

/**
 *13
 Array sort: to sort arrays ascendingly or descendingly.
 NOTE: This method changes the orginal array. If you want to avoid this, use .slice() method before sorting 
 
 */
  
//sort students by paid tuition
const dataSortedByTuitionPaid = data.sort( 
  (studA, studB) => studA.tuitionPaid - studB.tuitionPaid
);

console.log(dataSortedByTuitionPaid)

/**
 *14
 Working with immutable arrays
 */

//adding a new student object to the data array using spread (...) operator



//Remove a student object using filter method

//Update a student object using the map method
