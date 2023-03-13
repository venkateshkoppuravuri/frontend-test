import React from "react";
import {render, screen} from '@testing-library/react'

import App from "./App";

jest.mock("./utils/api");

describe("Autocomplete", () => {
  it("renders correctly", () => {
    render(<App />);

    const input = screen.getByRole('textbox', {placeholder: /search for a product/i})
    
    expect(input).toBeInTheDocument();
  });
});
