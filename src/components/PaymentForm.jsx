import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./PaymentForm.css";

export default function PaymentForm() {
  const location = useLocation();
  const { orderId: initialOrderId, amount: initialAmount } = location.state || {};

  const [formData, setFormData] = useState({
    orderId: initialOrderId || "",
    amount: initialAmount || "",
    paymentMethod: "PIX",
    paymentDetails: {}
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["orderId", "amount", "paymentMethod"].includes(name)) {
      setFormData({ ...formData, [name]: value });

      // ✅ Sempre reseta os detalhes quando muda o método de pagamento
      if (name === "paymentMethod") {
        setFormData({
          ...formData,
          paymentMethod: value,
          paymentDetails: {}
        });
      }

    } else {
      setFormData({
        ...formData,
        paymentDetails: { ...formData.paymentDetails, [name]: value }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      orderId: formData.orderId,
      amount: Number(formData.amount),
      paymentMethod: formData.paymentMethod,
      paymentDetails: { ...formData.paymentDetails }
    };

    // ✅ Necessário pro backend: incluir paymentMethod dentro de paymentDetails
    payload.paymentDetails.paymentMethod = formData.paymentMethod;

    // ✅ Ajustar formato da data no boleto
    if (formData.paymentMethod === "BANK_SLIP" && payload.paymentDetails?.dueDate) {
      payload.paymentDetails.dueDate = `${payload.paymentDetails.dueDate}T00:00:00`;
    }

    console.log("📤 Enviando payload:", payload);

    try {
      await axios.post("74.220.48.0/24/api/v1/payments", payload);
      setMessage("✅ Pagamento processado com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao processar pagamento:", err.response?.data || err);
      setMessage("❌ Erro ao processar pagamento. Verifique os dados.");
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="logo">
          <span className="logo-icon">⚡</span> Clickbait
        </h1>
      </header>

      <main className="payment-container">
        <div className="payment-card">
          <h2>💳 Processar Pagamento</h2>

          <form onSubmit={handleSubmit} className="payment-form">

            <label>Order ID</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              required
              readOnly={!!initialOrderId}
              style={initialOrderId ? { backgroundColor: '#333', color: '#888' } : {}}
            />

            <label>Valor</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              readOnly={!!initialAmount}
              style={initialAmount ? { backgroundColor: '#333', color: '#888' } : {}}
            />

            <label>Método</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="PIX">PIX</option>
              <option value="CREDIT_CARD">Cartão de Crédito</option>
              <option value="BANK_SLIP">Boleto</option>
            </select>

            {/* Dados do Cartão */}
            {formData.paymentMethod === "CREDIT_CARD" && (
              <>
                <label>Número do Cartão</label>
                <input type="text" name="cardNumber" required onChange={handleChange} />

                <label>Nome no Cartão</label>
                <input type="text" name="cardHolderName" required onChange={handleChange} />

                <label>Validade</label>
                <input type="text" name="expirationDate" placeholder="MM/AA" required onChange={handleChange} />

                <label>CVV</label>
                <input type="text" name="cvv" required onChange={handleChange} />
              </>
            )}

            {/* Dados PIX */}
            {formData.paymentMethod === "PIX" && (
              <>
                <label>Chave PIX</label>
                <input type="text" name="pixKey" required onChange={handleChange} />

                <label>Tipo da Chave</label>
                <select name="pixKeyType" required onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="CPF">CPF</option>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Telefone</option>
                  <option value="RANDOM_KEY">Chave Aleatória</option>
                </select>
              </>
            )}

            {/* Dados do Boleto */}
            {formData.paymentMethod === "BANK_SLIP" && (
              <>
                <label>Documento do Cliente</label>
                <input type="text" name="customerDocument" required onChange={handleChange} />

                <label>Nome do Cliente</label>
                <input type="text" name="customerName" required onChange={handleChange} />

                <label>Data de Vencimento</label>
                <input type="date" name="dueDate" required onChange={handleChange} />
              </>
            )}

            <button type="submit">💰 Pagar</button>
          </form>

          {message && <p className="payment-message">{message}</p>}
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Clickbait - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
