import React from "react";

export default function Empty({ onAdd }) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        onClick={onAdd}
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
