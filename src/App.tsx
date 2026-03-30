import { ordersMock } from "./data/orders";

export default function App() {
  return (
    <div style={{ padding: 20}}>
      <h1>Gerenciamento de Ordens</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Instrumento</th>
            <th>Lado</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Quantidade Restante</th>
            <th>Status</th>
            <th>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {ordersMock.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.instrument}</td>
              <td>{order.side}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.remainingQuantity}</td>
              <td>{order.status}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}