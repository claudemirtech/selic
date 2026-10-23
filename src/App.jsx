import { useState } from 'react'
import { formatDate, thirtyDaysAgo } from './util/DateUtil';
import './css/App.css'

export function App() {
  const [cdSerie, setCdSerie] = useState(1178);
  const [dtInicial, setDtInicial] = useState(formatDate(thirtyDaysAgo()));
  const [dtFinal, setDtFinal] = useState(formatDate(new Date()));
  const [data, setData] = useState([]);

  const url = `https://bcb-proxy.claudemir-69b.workers.dev/dados/serie/bcdata.sgs.${cdSerie}/dados?formato=json&dataInicial=${dtInicial}&dataFinal=${dtFinal}`;

  const consultarDados = (url) => {
    fetch(url).then((response) => response.json()).then((data) => {
        setData(data); // Store the data in state
      }).catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  
  return (
    <>
      <h2>Série Selic</h2>
      <div className="card">
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="serie">Serie</label>
            <input
              id="serie"
              type="number"
              value={cdSerie}
              onChange={(e) => setCdSerie(e.target.value)}
              placeholder="1178"
            />
          </div>
          <div className="input-group">
            <label htmlFor="dtinicial">Data Inicial</label>
            <input
              id="dtinicial"
              type="text"
              value={dtInicial}
              onChange={(e) => setDtInicial(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="input-group">
            <label htmlFor="dtfinal">Data Final</label>
            <input
              id="dtfinal"
              type="text"
              value={dtFinal}
              onChange={(e) => setDtFinal(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
        
        <button onClick={() => consultarDados(url)}>
          Consultar
        </button>
        {data.length > 0 && (
        <div className="table-container">
          <h2>Dados Selic</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Percentual</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.data}</td>
                  <td>{item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
      <p className="read-the-docs">
        Clique no botão "Consultar" para buscar os dados
      </p>
    </>
  )
}