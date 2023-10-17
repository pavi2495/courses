import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NoteDialogBox from "../components/CourseDialogBox";

describe("NoteDialogBox Component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(
      <NoteDialogBox
        open={true}
        onClose={() => {}}
        onSave={() => {}}
        title=""
        body=""
      />
    );
    const addNoteText = screen.getByTestId("initialTitleId");
    expect(addNoteText).toBeInTheDocument();
  });
});
