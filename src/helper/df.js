test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(4);
});

test("getInterviewersForDay returns an array containing the correct interviewers ", () => {
  const [first, second,third,forth] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(1);
  expect(second).toEqual(2);
  expect(third).toEqual(3);
  expect(forth).toEqual(4);

});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

