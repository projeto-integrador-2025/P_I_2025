// hooks/useMonitoramento.ts
import { useEffect, useState } from 'react';
import api from '../services/api';

type MonitoramentoData = {
  reciclaveis: number;
  naoReciclaveis: number;
  [key: string]: any; // caso tenha mais campos
};

export function useMonitoramento() {
  const [dados, setDados] = useState<MonitoramentoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await api.get('/[Controller]'); // Ajuste o endpoint real
        setDados(response.data);
      } catch (err) {
        setErro('Erro ao carregar dados de monitoramento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, []);

  return { dados, loading, erro };
}
