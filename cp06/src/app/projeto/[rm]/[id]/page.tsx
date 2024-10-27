"use client"
import { useState , useEffect } from "react";
import { TipoProjeto } from "@/types/types";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Projeto() {

    const params = useParams();
    const {rm , id} = params
    
    const [projeto, setProjeto] = useState<TipoProjeto>();

    const chamadaApi = async () => {
        try {
            const response = await fetch(`/api/base-projetos/${rm}/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os projetos');
            }
            const data = await response.json();
            console.log(data)
            setProjeto(data);
        } catch (error) {
            console.error('Erro na chamada da API:', error);
            alert('Erro ao carregar os projetos. Tente novamente mais tarde.');
        }
    };
    
    useEffect(() => {
        chamadaApi();
    },  [rm , id]);

  return (
    <section className="w-11/12">
        {projeto ?
        <div key={projeto.$id} className="bg-verdeCard mt-4 rounded-2xl p-4 mx-auto text-center flex flex-col gap-5 w-1/3">
            <h2 className="text-2xl">{projeto.nome}</h2>
            <p className="text-lg">Descrição: {projeto.desc}</p>
            <p className="text-lg">Nota: {projeto.nota}</p>
            <p className="text-lg">Feedback: {projeto.feedback}</p>
            <div>
                <Link href={projeto.link} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-2xl">Link Projeto</Link>
            </div>
        </div> : 
        <></>}
    </section>
  )
}
