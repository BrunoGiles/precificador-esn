import { useState } from "react";

function App() {
  const [form, setForm] = useState({tipo: "", homologacao: "", treinamento: "", venda: "", pdvs: 0, dias: 0});
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const calcular = () => {
    let A = form.tipo === "Novo Cliente" ? 12 : 6.5;
    let B = form.tipo === "Novo Cliente" && form.homologacao === "Sim" ? 14.5 : 0;
    let C = form.tipo === "Rollout" && form.treinamento === "Sim" ? 2 : 0;
    let D = form.venda === "Sim" ? 2 : 0;
    let E = parseFloat(form.pdvs) * 1.5;
    let F = parseFloat(form.dias) * 8;
    let G = (A + B + C + D + E + F) * 97.78;
    let H = G * 0.2 * 144.62;
    let I = G + H;
    let J = I + (I * 0.1);
    let K = J + (J * 0.3);

    setResultado(K.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Precificador ESN</h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg space-y-4">
        <select name="tipo" onChange={handleChange} className="w-full p-2 rounded border">
          <option value="">Tipo de Serviço</option>
          <option>Novo Cliente</option>
          <option>Rollout</option>
        </select>

        {form.tipo === "Novo Cliente" && (
          <select name="homologacao" onChange={handleChange} className="w-full p-2 rounded border">
            <option value="">Homologação?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
        )}

        {form.tipo === "Rollout" && (
          <select name="treinamento" onChange={handleChange} className="w-full p-2 rounded border">
            <option value="">Treinamento para Rollout?</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
        )}

        <select name="venda" onChange={handleChange} className="w-full p-2 rounded border">
          <option value="">Venda Assistida?</option>
          <option>Sim</option>
          <option>Não</option>
        </select>

        <input type="number" name="pdvs" placeholder="Quantidade de PDVs" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="number" name="dias" placeholder="Dias de Acompanhamento" onChange={handleChange} className="w-full p-2 rounded border" />

        <button onClick={calcular} className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">Calcular</button>

        {resultado && <div className="mt-4 text-xl">Valor: R$ {resultado}</div>}
      </div>
    </div>
  );
}

export default App;