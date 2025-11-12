import { createFileRoute, Link, useLoaderData, useNavigation } from '@tanstack/react-router';
import { extrairId } from '../utils';
import type { Personagem, SwapiPeopleResponse } from '../types';
import './ListaPersonagens.css';

async function fetchPersonagens(): Promise<Personagem[]> {
  const res = await fetch('https://swapi.dev/api/people/');
  if (!res.ok) throw new Error('Não foi possível buscar os personagens.');
  const data = (await res.json()) as SwapiPeopleResponse;
  return data.results;
}

export const Route = createFileRoute('/')({
  loader: fetchPersonagens,
  component: Index,
});

function Index() {
  const personagens = Route.useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === 'pending') return <div className="loading">Carregando a galáxia...</div>;

  return (
    <>
      <h2>Personagens</h2>
      <div className="lista-personagens">
        {personagens.map((personagem) => {
          const id = extrairId(personagem.url);
          return (
            <Link to="/personagem/$id" params={{ id }} key={id} className="card-personagem">
              <h3>{personagem.name}</h3>
              <p>Ano de Nasc.: {personagem.birth_year}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
