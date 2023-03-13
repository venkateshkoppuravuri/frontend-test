import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

describe("Autocomplete", () => {
  let props;

  beforeEach(() => {
    props = {
      searchTerm: "",
      setSearchTerm: jest.fn(),
      suggestions: [
        {id:1, title: "11"},
        {id:2, title: "12"},
        {id:3, title: "13"},
        {id:4, title: "14"},
        {id:5, title: "15"},
        {id:6, title: "16"},
        {id:7, title: "17"},
        {id:8, title: "18"},
        {id:9, title: "19"},
        {id:10, title: "10"}
      ],
      handleSuggestionClick: jest.fn(),
      handleKeyDown: jest.fn(),
      isSearching: false,
      selectedSuggestionIndex: -1,
    };
  });

  it("should render an input element with a placeholder", () => {
    render(<Autocomplete {...props} />);
    const inputElement = screen.getByPlaceholderText("Search for a product");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call setSearchTerm with the input value when it changes", () => {
    render(<Autocomplete {...props} />);
    const inputElement = screen.getByPlaceholderText("Search for a product");
    fireEvent.change(inputElement, { target: { value: "apple" } });
    expect(props.setSearchTerm).toHaveBeenCalledWith("apple");
  });

  it("should call handleKeyDown when a key is pressed on the input element", () => {
    render(<Autocomplete {...props} />);
    const inputElement = screen.getByPlaceholderText("Search for a product");
    fireEvent.keyDown(inputElement);
    expect(props.handleKeyDown).toHaveBeenCalled();
  });

  it("should render a cancel button when searchTerm is not empty", () => {
    props.searchTerm = "apple";
    render(<Autocomplete {...props} />);
    const cancelButton = screen.getByText("x");
    expect(cancelButton).toBeInTheDocument();
  });

  it("should call setSearchTerm with an empty string when cancel button is clicked", () => {
    props.searchTerm = "apple";
    render(<Autocomplete {...props} />);
    const cancelButton = screen.getByText("x");
    fireEvent.click(cancelButton);
    expect(props.setSearchTerm).toHaveBeenCalledWith("");
  });

  it("should render 10 suggestions if user enters 1 as text", () => {
    const { container } = render(<Autocomplete {...props} />);
    const inputElement = screen.getByPlaceholderText("Search for a product");
    fireEvent.change(inputElement, { target: { value: "11" } });
    const searchResults = container.getElementsByClassName("search-results");
    expect(searchResults).toHaveLength(1);
    expect(searchResults[0].children).toHaveLength(10);
  });
});