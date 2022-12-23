// const ri = (s) => {
//   const arr1 = s.split("");
//   const lib = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
//   const result = arr1
//     .reduce((acc, value, index) => {
//       if (value === "I") {
//         acc = [...acc, ["V", "X"].includes(arr1[index + 1]) ? -1 : 1];
//       } else if (value === "X") {
//         acc = [...acc, ["L", "C"].includes(arr1[index + 1]) ? -10 : 10];
//       } else if (value === "C") {
//         acc = [...acc, ["D", "M"].includes(arr1[index + 1]) ? -100 : 100];
//       } else acc = [...acc, lib[value]];
//       console.log("----", acc, "index=", arr1[index], "next=", arr1[index + 1]);
//       return acc;
//     }, [])
//     .reduce((acc, value) => {
//       return (acc += value);
//     }, 0);

//   return result;
// };
// var longestCommonPrefix = function (strs) {
//   //console.log(strs[0].slice(0,i));
//   //for (let i=0, i<strs[0].length,i++)
//   let j = 0;
//   let flag = true;
//   if (strs.length <= 1) {
//     return strs[0];
//   } else {
//     while (j < strs[0].length && flag) {
//       strs.forEach((element) => {
//         if (element[j] !== strs[0][j]) flag = false;
//       });
//       j++;
//     }
//     console.log("j=", j, strs[0].slice(0, j - 1));
//     return j > 0 ? strs[0].slice(0, j - 1) : "";
//   }
//   //   while(strs[i][j]===strs[0][j] && i<strs.length) {
//   //     i+=1;
//   //   }
//   //   if(i===strs.length){j+=1;i=0}
//   // }
//   //return (j>1?strs[0].slice(0,j-1):'');
// };
// //   while(!ak.includes(false))
// //    { i+=1;
// //      ak = strs.map(item=>{
// //       return(strs[0].slice(0,i)===item.slice(0,i))
// //      });
// //     }
// //  return (i>1)?strs[0].slice(0,i-1):"no common!" ;
// //  };

// //console.log(longestCommonPrefix(["abced"]));
// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */

// var threeSum = function (num) {
//   let res =[];

//   function compareNumbers(a, b) {
//   return a - b;
// }
//   const iter=(nums)=>{
//   if (nums.length < 3) return res;
//   else {
//     let num1 = nums[0];
//     let num2 = nums[1];
//     res = res||[];
//     for (let j = 1; j < nums.length - 1; j++) {
//       num2 = nums[j];
//       for (let i = j + 1; i < nums.length; i++) {
//         if (num1 + num2 + nums[i] === 0) {
//           let array = [num1,num2,nums[i]].sort(compareNumbers);
//           console.log('arr=',array);
//           console.log("res=",res,'incl===',res.includes(array));
//           const aka = res.filter(item=>item===array);
//           console.log('aka===',aka);
//           res=res.includes(array)?res:[...res,array]  
//         }
//       }
//     }
//   }
//   iter(nums.slice(1));
//   return res;
//   };
//   return iter(num);
// };
// console.log(threeSum([-1,0,1,2,-1,-4]));

//const appointments = require("/helper/mockdata.js");
const obj2Arr = require("./helper/selectors"); 
// import appointments from "/helper/mockdata";
// import {obj2Arr} from '/helper/helpFunctions';
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};
console.log(obj2Arr(appointments));

