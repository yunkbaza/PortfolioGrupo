"use client"
import { useState , useEffect } from "react";
import { TipoProjeto } from "@/types/types";
import { useParams } from "next/navigation";

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
    <section className="my-auto">
        {projeto ?
        <div key={projeto.$id} className="bg-verdeCard w-11/12 mx-auto mt-4 rounded-2xl p-4 my-auto">
            <h2>{projeto.nome}</h2>
            <p>{projeto.desc}</p>
            <p>{projeto.nota}</p>
            <p>{projeto.feedback}</p>
            <p>{projeto.foto}</p>
        </div> : 
        <></>}
    </section>
    // export type TipoProjeto = {
    //     $id: string;
    //     nome:string; // 30
    //     rm:string; // 6
    //     desc:string; // 200
    //     nota:number; // 0-10
    //     tipoAvaliacao:string; // 15
    //     foto:string; // 100
    //     feedback:string; // 150
    // }
  )
}
