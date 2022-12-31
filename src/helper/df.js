// test("getInterviewersForDay returns an array", () => {
//   const result = getInterviewersForDay(state, "Monday");
//   expect(Array.isArray(result)).toBe(true);
// });

// test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
//   const result = getInterviewersForDay(state, "Monday");
//   expect(result.length).toEqual(4);
// });

// test("getInterviewersForDay returns an array containing the correct interviewers ", () => {
//   const [first, second,third,forth] = getInterviewersForDay(state, "Tuesday");
//   expect(first).toEqual(1);
//   expect(second).toEqual(2);
//   expect(third).toEqual(3);
//   expect(forth).toEqual(4);

// });

// test("getInterviewersForDay returns an empty array when the days data is empty", () => {
//   const result = getInterviewersForDay({ days: [] }, "Monday");
//   expect(result.length).toEqual(0);
// });

// test("getInterviewersForDay returns an empty array when the day is not found", () => {
//   const result = getInterviewersForDay(state, "Wednesday");
//   expect(result.length).toEqual(0);
// });

const days = [{"id":1,"name":"Monday","appointments":[1,2,3,4,5],"interviewers":[2,3,6,8,10],"spots":2},{"id":2,"name":"Tuesday","appointments":[6,7,8,9,10],"interviewers":[1,2,4,5,8],"spots":2},{"id":3,"name":"Wednesday","appointments":[11,12,13,14,15],"interviewers":[1,2,6,8,10],"spots":2},{"id":4,"name":"Thursday","appointments":[16,17,18,19,20],"interviewers":[3,4,7,9,10],"spots":3},{"id":5,"name":"Friday","appointments":[21,22,23,24,25],"interviewers":[1,2,3,5,10],"spots":2}];
let res ={};
const aka = days.map(x=>{res[x.name]=x['id']})
const aaa = days.reduce((acc,cur)=>{
  let aa = cur.name;
  acc[aa] = cur.id;
  return acc},{})
console.log(res);
console.log(aaa);

function dayOfAppointment(id,days){
  id = id *1;
  console.log(typeof(id));
  for(const day of days ){
    //console.log(day);
     if (day['appointments'].includes(id))
     return day.name;
  }
        
  };

console.log(dayOfAppointment(1,days));