import { createFileRoute, Link, useLoaderData, useNavigation } from '@tanstack/react-router';
import type { Personagem } from '../types';
import './DetalhePersonagem.css';

async function fetchPersonagem({ params }: { params: { id: string } }): Promise<Personagem> {
  const res = await fetch(`https://swapi.dev/api/people/${params.id}/`);
  if (!res.ok) throw new Error('Não foi possível buscar este personagem.');
  return (await res.json()) as Personagem;
}

export const Route = createFileRoute('/personagem/$id')({
  loader: fetchPersonagem,
  component: DetalhePersonagem,
});

function DetalhePersonagem() {
  const personagem = Route.useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === 'pending') return <div className="loading">Carregando dados do Holocron...</div>;

  return (
    <div className="detalhe-personagem">
      <Link to="/" className="link-voltar">&larr; Voltar para a lista</Link>
      <h2>{personagem.name}</h2>
      <div className="info-grid">
        <div className="info-item"><strong>Altura:</strong> {personagem.height} cm</div>
        <div className="info-item"><strong>Peso:</strong> {personagem.mass} kg</div>
        <div className="info-item"><strong>Cor do Cabelo:</strong> {personagem.hair_color}</div>
        <div className="info-item"><strong>Cor da Pele:</strong> {personagem.skin_color}</div>
        <div className="info-item"><strong>Cor dos Olhos:</strong> {personagem.eye_color}</div>
        <div className="info-item"><strong>Ano de Nasc.:</strong> {personagem.birth_year}</div>
        <div className="info-item"><strong>Gênero:</strong> {personagem.gender}</div>
      </div>
    </div>
  );
}
