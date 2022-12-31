import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  console.log('-mode>',result.current.mode,'--history->',result.current.history);
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  console.log('-mode>',result.current.mode,'--history->',result.current.history);
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  console.log('-modeB>',result.current.mode,'--historyB->',result.current.history);
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  console.log('-modeB>',result.current.mode,'--historyB->',result.current.history);
  expect(result.current.mode).toBe(FIRST);

  act(() => result.current.back());
  console.log('-modeB',result.current.mode,'--historyB->',result.current.history);
  expect(result.current.mode).toBe(FIRST);

  act(() => result.current.transition(SECOND));
  console.log('-mode>',result.current.mode,'--history->',result.current.history);
  expect(result.current.mode).toBe(SECOND);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(THIRD, true));
  console.log('-moder>',result.current.mode,'--historyR->',result.current.history);
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  console.log('-modeB',result.current.mode,'--historyB->',result.current.history);
  expect(result.current.mode).toBe(FIRST);
});
w