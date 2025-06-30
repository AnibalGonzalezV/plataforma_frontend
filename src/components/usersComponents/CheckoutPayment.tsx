import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle, CreditCard, Banknote } from 'lucide-react';

// TODO: Recibir los datos del pedido por contexto, store o location.state
const pedidoEjemplo = {
  productos: [
    { nombre: 'Pizza Margherita', cantidad: 2, precio: 8000 },
    { nombre: 'Café Americano', cantidad: 1, precio: 2500 },
  ],
  total: 18500,
  direccion: 'Av. Principal 123',
  tipoEntrega: 'Domicilio',
};

export default function CheckoutPayment() {
  const navigate = useNavigate();
  // TODO: Reemplazar pedidoEjemplo por los datos reales del pedido
  const pedido = pedidoEjemplo;

  const [metodoPago, setMetodoPago] = useState('saldo');
  const [pagando, setPagando] = useState(false);
  const [exito, setExito] = useState(false);

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();
    setPagando(true);
    // TODO: Aquí va la lógica real de pago (API interna)
    setTimeout(() => {
      setPagando(false);
      setExito(true);
      // Opcional: limpiar carrito, redirigir, etc.
    }, 1200);
  };

  if (exito) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 p-8 flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2 text-center">¡Pago realizado con éxito!</h2>
          <p className="text-gray-300 mb-6 text-center">Tu pedido ha sido confirmado y está en proceso.</p>
          <button onClick={() => navigate('/pedidos')} className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg">Ver mis pedidos</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 p-8">
        <h2 className="text-2xl font-bold mb-6 text-white text-center flex items-center justify-center gap-2">
          <ShoppingBag className="h-6 w-6 text-blue-400" /> Pasarela de pago
        </h2>
        {/* Resumen del pedido */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Resumen del pedido</h3>
          <ul className="mb-2">
            {pedido.productos.map((prod, idx) => (
              <li key={idx} className="flex justify-between text-gray-300 text-sm mb-1">
                <span>{prod.nombre} x{prod.cantidad}</span>
                <span>${prod.precio * prod.cantidad}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-white font-bold text-lg border-t border-gray-700 pt-2">
            <span>Total</span>
            <span>${pedido.total}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm mt-2">
            <span>Dirección:</span>
            <span>{pedido.direccion}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Entrega:</span>
            <span>{pedido.tipoEntrega}</span>
          </div>
        </div>
        {/* Formulario de método de pago interno */}
        <form onSubmit={handlePagar} className="space-y-6">
          <div>
            <label className="block text-base text-gray-200 mb-2">Método de pago</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="metodoPago" value="saldo" checked={metodoPago === 'saldo'} onChange={() => setMetodoPago('saldo')} className="accent-blue-600" />
                <CreditCard className="h-5 w-5 text-blue-400" /> Saldo interno
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="metodoPago" value="transferencia" checked={metodoPago === 'transferencia'} onChange={() => setMetodoPago('transferencia')} className="accent-blue-600" />
                <Banknote className="h-5 w-5 text-green-400" /> Transferencia
              </label>
            </div>
          </div>
          <button type="submit" disabled={pagando} className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg">
            {pagando ? 'Procesando pago...' : 'Finalizar pago'}
          </button>
        </form>
        {/*
          TODO:
          - Reemplazar pedidoEjemplo por los datos reales del pedido (usar contexto, store, location.state, etc)
          - Al confirmar pago, llamar a la API interna y mostrar feedback
          - Limpiar carrito y redirigir si es necesario
        */}
      </div>
    </div>
  );
} 