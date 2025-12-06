function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.preco * item.quantidade;

  return (
    <div className="cart-item">
      <div className="item-info">
        <h3>{item.nome}</h3>
        <div className="item-price">
          R$ {item.preco.toFixed(2)}
        </div>
      </div>

      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={onDecrease}
          disabled={item.quantidade <= 1}
          aria-label={`Diminuir ${item.nome}`}
        >
          -
        </button>
        <span className="quantity-display">{item.quantidade}</span>
        <button
          className="quantity-btn"
          onClick={onIncrease}
          aria-label={`Aumentar ${item.nome}`}
        >
          +
        </button>
        <button
          className="remove-btn"
          onClick={onRemove}
          aria-label={`Remover ${item.nome}`}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default CartItem;