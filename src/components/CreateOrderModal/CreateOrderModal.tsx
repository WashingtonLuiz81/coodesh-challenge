import { useState } from "react";
import { Modal } from "@/components";
import type { OrderSide } from "@/types/order";
import styles from "./CreateOrderModal.module.css";
import { formatCurrency } from "@/utils";

type CreateOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (data: {
    instrument: string;
    side: OrderSide;
    price: number;
    quantity: number;
  }) => void;
};

type CreateOrderFormData = {
  instrument: string;
  side: OrderSide;
  price: number;
  quantity: string;
};

const initialFormData: CreateOrderFormData = {
  instrument: "",
  side: "COMPRA",
  price: 0,
  quantity: "",
};

export function CreateOrderModal({
  isOpen,
  onClose,
  onCreateOrder,
}: CreateOrderModalProps) {
  const [formData, setFormData] = useState<CreateOrderFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [priceInput, setPriceInput] = useState("");

  const isFormValid =
    formData.instrument.trim() !== "" &&
    formData.price > 0 &&
    Number(formData.quantity) > 0;

  const handleChange = (
    field: keyof CreateOrderFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    setPriceInput("");
    onClose();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.instrument.trim()) {
      newErrors.instrument = "Informe o instrumento.";
    }

    if (formData.price <= 0) {
      newErrors.price = "Informe um preço válido.";
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Informe uma quantidade válida.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 7);
    const parsedValue = Number(numericValue) / 100;

    if (!numericValue) {
      setPriceInput("");
      handleChange("price", 0);
      return;
    }

    setPriceInput(formatCurrency(parsedValue));
    handleChange("price", parsedValue);
  };

  const handleQuantityChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");
    handleChange("quantity", sanitizedValue);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onCreateOrder({
      instrument: formData.instrument.trim().toUpperCase(),
      side: formData.side,
      price: formData.price,
      quantity: Number(formData.quantity),
    });

    handleClose();
  };

  return (
    <Modal isOpen={isOpen} title="Nova Ordem" onClose={handleClose}>
      <div className={styles.form}>
        <p className={styles.helper}>* Campos obrigatórios</p>

        <div className={styles.field}>
          <label htmlFor="instrument" className={styles.label}>
            Instrumento <span className={styles.required}>*</span>
          </label>

          <input
            id="instrument"
            type="text"
            value={formData.instrument}
            onChange={(e) => handleChange("instrument", e.target.value)}
            className={styles.input}
            placeholder="Ex: PETR4"
          />

          {errors.instrument ? (
            <span className={styles.error}>{errors.instrument}</span>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="side" className={styles.label}>
            Lado <span className={styles.required}>*</span>
          </label>

          <select
            id="side"
            value={formData.side}
            onChange={(e) =>
              handleChange("side", e.target.value as OrderSide)
            }
            className={styles.input}
          >
            <option value="COMPRA">Compra</option>
            <option value="VENDA">Venda</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="price" className={styles.label}>
            Preço <span className={styles.required}>*</span>
          </label>

          <input
            id="price"
            type="text"
            inputMode="numeric"
            placeholder="R$ 0,00"
            value={priceInput}
            onChange={(e) => handlePriceChange(e.target.value)}
            className={styles.input}
            maxLength={16}
          />

          {errors.price ? (
            <span className={styles.error}>{errors.price}</span>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="quantity" className={styles.label}>
            Quantidade <span className={styles.required}>*</span>
          </label>

          <input
            id="quantity"
            type="text"
            inputMode="numeric"
            value={formData.quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className={styles.input}
            placeholder="Ex: 100"
          />

          {errors.quantity ? (
            <span className={styles.error}>{errors.quantity}</span>
          ) : null}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.secondaryButton}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className={styles.primaryButton}
            disabled={!isFormValid}
          >
            Criar ordem
          </button>
        </div>
      </div>
    </Modal>
  );
}