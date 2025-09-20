import React from 'react';
import './styles/ProductCard.css';

function ProductCard({ product }) {
  const {
    image,
    category,
    name,
    description,
    manufacturer,
    supplier,
    price,
    unit,
    stock,
    discount
  } = product;

  return (
    <div className="product-card">
      <div className="product-content">
        {/* Блок с фото слева */}
        <div className="product-image-section">
          <div className="product-image">
            <img src={image || '/placeholder-image.jpg'} alt={name} />
          </div>
        </div>

        {/* Блок с описанием по центру */}
        <div className="product-info-section">
          <div className="product-header">
            <span className="product-category">{category}</span>
            <h3 className="product-name">{name}</h3>
          </div>

          <div className="product-details">
            <div className="product-description">
              <strong>Описание товара:</strong>
              <p>{description}</p>
            </div>

            <div className="product-info">
              <div className="info-row">
                <strong>Производитель:</strong>
                <span>{manufacturer}</span>
              </div>
              
              <div className="info-row">
                <strong>Поставщик:</strong>
                <span>{supplier}</span>
              </div>
              
              <div className="info-row">
                <strong>Цена:</strong>
                <span className="product-price">{price} ₽</span>
              </div>
              
              <div className="info-row">
                <strong>Единица измерения:</strong>
                <span>{unit}</span>
              </div>
              
              <div className="info-row">
                <strong>Количество на складе:</strong>
                <span className={`stock-amount ${stock === 0 ? 'out-of-stock' : ''}`}>
                  {stock} {unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Блок скидки справа */}
        {discount > 0 && (
          <div className="product-discount-section">
            <div className="product-discount">
              <span className="discount-badge">ДЕЙСТВУЮЩАЯ СКИДКА: {discount}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
