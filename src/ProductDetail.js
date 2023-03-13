import React, { useState, useEffect, memo } from "react";

import { fetchProductDetail } from "./utils/api";

import "./ProductDetail.css";

function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetchProductDetail(productId).then((productInfo) =>
      setProductInfo(productInfo)
    );
  }, [productId]);

  const renderProductInfo = () => {
    return (
      <div className="detail-container">
        <div className="row">
          <img src={productInfo.image} className="product-image" alt={productInfo.title} />
        </div>
        <div className="column">
          <div className="title">{productInfo.title}</div>
          <div className="description">{productInfo.description}</div>
          <div className="price">{`$${productInfo.price}`}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default memo(ProductDetail);
