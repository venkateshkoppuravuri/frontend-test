import React from "react";
import { render, waitFor } from "@testing-library/react";
import ProductDetail from "./ProductDetail";

// mock fetchProductDetail function
jest.mock("./utils/api");
const { fetchProductDetail } = require("./utils/api");

describe("ProductDetail", () => {
  it("should render nothing when productId is null or undefined", () => {
    const { container } = render(<ProductDetail productId={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render product info correctly when productId is valid", async () => {
    // mock data
    const productInfo = {
      id: 1,
      title: "Test product",
      description: "This is a test product",
      price: 9.99,
      image: "test.jpg",
    };

    // mock fetchProductDetail to resolve with mock data
    fetchProductDetail.mockResolvedValue(productInfo);

    // render component with valid productId
    const { getByAltText, getByText } = render(
      <ProductDetail productId={productInfo.id} />
    );

    // wait for async effect to finish
    await waitFor(() => expect(fetchProductDetail).toHaveBeenCalled());

    // assert that product info is rendered correctly
    expect(getByAltText(productInfo.title)).toHaveAttribute(
      "src",
      productInfo.image
    );
    expect(getByText(productInfo.title)).toBeInTheDocument();
    expect(getByText(productInfo.description)).toBeInTheDocument();
    expect(getByText(`$${productInfo.price}`)).toBeInTheDocument();
  });
});