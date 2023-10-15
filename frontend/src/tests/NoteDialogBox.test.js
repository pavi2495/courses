import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
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
    const addNoteText = getByText("Add New Note");
    expect(addNoteText).toBeInTheDocument();
  });

  test("disables save button if title or body is empty", async () => {
    const onSaveMock = jest.fn();
    const onCloseMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <NoteDialogBox
        open={true}
        onClose={onCloseMock}
        onSave={onSaveMock}
        title=""
        body=""
      />
    );

    const titleInput = getByPlaceholderText("Title");
    const bodyInput = getByPlaceholderText("Body");
    const saveButton = getByText("Save");

    // Verify save button is initially disabled
    expect(saveButton).toBeDisabled();

    // Enter valid title and body
    fireEvent.change(titleInput, {
      target: { value: "Valid Title" },
    });

    fireEvent.change(bodyInput, {
      target: { value: "Valid Body" },
    });

    // Wait for the component to re-render after state updates
    await waitFor(() => {
      // Save button should not have 'disabled' attribute
      expect(saveButton).not.toBeDisabled();
    });

    // Clear title and body to make save button disabled
    fireEvent.change(titleInput, {
      target: { value: "" },
    });

    fireEvent.change(bodyInput, {
      target: { value: "" },
    });

    // Wait for the component to re-render after state updates
    await waitFor(() => {
      // Save button should have 'disabled' attribute set to true
      expect(saveButton).toBeDisabled();
    });
  });
});
