import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchPreview from "./SearchPreview";

// mock props
const mockProps = {
  index: 0,
  id: "test-id",
  title: "Test title",
  handleSuggestionClick: jest.fn(),
  selectedSuggestionIndex: null,
};

describe("SearchPreview", () => {
  it("should render title prop correctly", () => {
    // render component with mock props
    const { getByText } = render(<SearchPreview {...mockProps} />);

    // assert that title is rendered correctly
    expect(getByText(mockProps.title)).toBeInTheDocument();
    expect(getByText(mockProps.title)).toHaveClass("title");
    expect(getByText(mockProps.title).parentElement).toHaveClass(
      "search-preview start"
    );
  });

  it("should call handleSuggestionClick prop with id prop when clicked", () => {
    // render component with mock props
    const { getByText } = render(<SearchPreview {...mockProps} />);

    // simulate click event on title element
    fireEvent.click(getByText(mockProps.title));

    // assert that handleSuggestionClick was called with id prop
    expect(mockProps.handleSuggestionClick).toHaveBeenCalledWith(mockProps.id);
  });
});