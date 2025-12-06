function CartSummary({ itemCount, subtotal, tax, total, onClear, onCheckout, disabled }) {
  return (
    <div className="cart-summary">
      <h2>💰 Resumo do Pedido</h2>

      {itemCount > 0 ? (
        <>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Taxa de serviço:</span>
            <span>R$ {tax.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-button"
            onClick={onCheckout}
            disabled={disabled}
          >
            Finalizar Compra
          </button>

          <div className="cart-actions" style={{ marginTop: '15px' }}>
            <button
              className="clear-cart"
              onClick={onClear}
              disabled={disabled}
            >
              Limpar Carrinho
            </button>
            <button className="continue-shopping">
              Continuar Comprando
            </button>
          </div>
        </>
      ) : (
        <p className="summary-empty">Carrinho vazio</p>
      )}
    </div>
  );
}

export default CartSummary;