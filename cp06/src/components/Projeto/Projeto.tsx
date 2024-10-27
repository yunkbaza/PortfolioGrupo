"use client"
import { useState , useEffect } from "react";
import { TipoProjeto } from "@/types/types";
import Link from "next/link";

export default function Projeto(props: {tipo:string , rm:string}) {

  let tipo;

  if (props.tipo === "cp") {
    tipo = "CheckPoint";
  } else if (props.tipo === "gs") {
    tipo = "Global Solution";
  } else if (props.tipo === "challenge") {
    tipo = "Challenge";
  } else if (props.tipo === "projetos") {
    tipo = "Projetos";
  } else {
    tipo = "Erro";
  }
  
  const [listaProjetos, setListaProjetos] = useState<TipoProjeto[]>([]);

  const chamadaApi = async () => {
    try {
        const response = await fetch(`/api/base-projetos/${props.rm}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os projetos');
        }
        const data = await response.json();
        setListaProjetos(data);
    } catch (error) {
        console.error('Erro na chamada da API:', error);
        alert('Erro ao carregar os projetos. Tente novamente mais tarde.');
    }
};

  useEffect(() => {
      chamadaApi();
  },  [props.rm]);

  return (
    <div className="bg-verdeCard w-11/12 mx-auto p-2 min-h-40 overflow-y rounded-2xl md:w-full">
      <h2 className="text-center font-bold text-xl mb-2">{tipo}</h2>
      <nav>
        <ul>
          {
          listaProjetos.filter(projeto => projeto.tipoAvaliacao == props.tipo).length > 0 ?
          listaProjetos.filter(projeto => projeto.tipoAvaliacao == props.tipo).map((projeto) => (
            <li key={projeto.$id} className="text-center">
              <Link href={`/projeto/${props.rm}/${projeto.$id}`} className="underline">{"<"}{projeto.nome}{">"}</Link>
            </li>
     )) : <li className="text-center">
        <p>Não há projetos Cadastrados</p>
      </li>}
        </ul>
      </nav>
    </div>
  )
}
