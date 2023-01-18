import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  getByText,
  queryAllByAltText,
  queryAllByText,
} from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  //tutor help: 2 tests can not perform together?..............................

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        interview={{ student: "Lydia Miller-Jones" }}
      />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //.............................................................................

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        interview={{ student: "", interviewer: 1 }}
      />
    );
    fireEvent.click(getByText("Save"));

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    /* 3. validation is shown */
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        interview={{ student: "Lydia Miller-Jones", interviewer: "" }}
      />
    );
    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();

    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        interview={
          { student: "Lydia Miller-Jones", interviewer:interviewers[0]}}
        onSave={onSave}      
      />
    );
    fireEvent.click(getByText("Save"));
    //console.log("-----------", typeof interviewers[0].id, interviewers[0].id);

    /* 5. validation is not shown */

    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 6. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 7. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  //  })
});
