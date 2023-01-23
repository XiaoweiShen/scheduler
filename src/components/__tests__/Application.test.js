import React from "react";
//import axios from "axios";//only use for error handling tests.

import {
  getAllByTestId,
  prettyDOM,
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByTestId,
  waitForElementToBeRemoved,
  getByDisplayValue,
} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "XXXX" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    
    await waitForElement(() => getByText(appointment, "Saving"));
    await waitForElement(() => getByText(appointment, "XXXX"));
    
    expect(getByText(appointment, "XXXX")).toBeInTheDocument();
    
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    
    fireEvent.click(getByAltText(appointment,'Delete'));
    await waitForElement(() => getByText(appointment, "Confirm to delete?"));
    fireEvent.click(getByText(appointment,"Confirm"));
   
    await waitForElement(()=>getByText(appointment,"Deleting"));
    await waitForElement(()=>getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    
    fireEvent.click(getByAltText(appointment,'Edit'));
       
    fireEvent.change(getByDisplayValue(container,"Archie Cohen"),{target:{value:"XXXX"},});
   fireEvent.click(getByText(appointment,"Save"));
   
   //await waitForElement(()=>getByText(appointment,"Saving"));
   await waitForElement(()=>getByText(appointment, "XXXX"));
   const day = getAllByTestId(container, "day").find((day) =>
     queryByText(day, "Monday"));
   expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
 });
 

//the error handling part need real axios , which can not run with previous test together, when need test these, need comment previous tests and import axios. 


//  it("shows the save error when failing to save an appointment",async ()=>{
//   axios.put.mockRejectedValueOnce();
//   const { container, debug } = render(<Application />);
//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   const appointments = getAllByTestId(container, "appointment");
//   const appointment = appointments[0];

//   fireEvent.click(getByAltText(appointment, "Add"));
//   fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
//     target: { value: "XXXX" },
//   });

//   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
//   fireEvent.click(getByText(appointment, "Save"));
//   await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
  
//   expect(getByText(appointment, "Can not create the interview")).toBeInTheDocument();
//   }); 

//   it("shows the delete error when failing to delete an existing appointment",async ()=>{
//     axios.delete.mockRejectedValueOnce();
//     const { container} = render(<Application />);
//         await waitForElement(() => getByText(container, "Archie Cohen"));
//         const appointments = getAllByTestId(container, "appointment");
//         const appointment = appointments[1];
        
//         fireEvent.click(getByAltText(appointment,'Delete'));
//         await waitForElement(() => getByText(appointment, "Confirm to delete?"));
//         fireEvent.click(getByText(appointment,"Confirm"));
       
//         await waitForElementToBeRemoved(()=>getByText(appointment,"Deleting"));
//         expect(getByText(appointment, "Can not cancel the interview")).toBeInTheDocument();
  
//     }); 
 
})