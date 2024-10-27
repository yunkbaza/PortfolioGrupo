"use client"
import { TipoProjeto } from "@/types/types";
import React, { useState } from "react";
import alunos from '@/data/base.json';

export default function FormCadastro() {
    
    const [projeto, setProjeto] = useState<TipoProjeto>({
        $id: "",
        nome: "",
        rm: "",
        desc: "",
        nota: 0,
        tipoAvaliacao: "",
        link: "",
        feedback: "",
    });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/base-projetos", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(projeto),
            })
            if (response.ok) {
                const data = await response.json();
                alert('Projeto Cadastrado com sucesso');
                setProjeto({
                    $id: "",
                    nome: "",
                    rm: "",
                    desc: "",
                    nota:0,
                    tipoAvaliacao: "",
                    link: "",
                    feedback: "",
                });
                console.table(data)
            }
        } catch (error) {
            console.error("Falha no carregamento: " , error);
        }
    }

  return (
    <section className="p-4 max-w-md mx-auto">
    <h1 className="text-2xl font-semibold mb-6 text-center">Cadastro</h1>
    <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome:</label>
            <input
                type="text"
                name="nome"
                value={projeto.nome}
                placeholder="Digite o nome do projeto"
                required
                onChange={(e) => setProjeto({ ...projeto, nome: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RM:</label>
            <select
                name="tipoAvaliacao"
                value={projeto.rm}
                required
                onChange={(e) => setProjeto({ ...projeto, rm: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Selecione</option>
                {alunos.map((aluno) => (
                    <option value={aluno.rm} key={aluno.rm}>{aluno.rm}</option>
                ))}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição:</label>
            <textarea
                name="desc"
                value={projeto.desc}
                placeholder="Fale um pouco sobre o projeto"
                required
                onChange={(e) => setProjeto({ ...projeto, desc: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nota:</label>
            <input
                type="number"
                step={0.01}
                name="nota"
                value={projeto.nota}
                placeholder="Insira a nota obtida"
                required
                onChange={(e) => setProjeto({ ...projeto, nota: parseFloat(e.target.value) })}
                min={0}
                max={10}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Avaliação:</label>
            <select
                name="tipoAvaliacao"
                value={projeto.tipoAvaliacao}
                required
                onChange={(e) => setProjeto({ ...projeto, tipoAvaliacao: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Selecione</option>
                <option value="cp">CheckPoint</option>
                <option value="gs">Global Solution</option>
                <option value="challenge">Challenge</option>
                <option value="projetos">Projetos</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link:</label>
            <input
                type="text"
                name="foto"
                value={projeto.link}
                placeholder="Insira o link do projeto"
                onChange={(e) => setProjeto({ ...projeto, link: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback:</label>
            <textarea
                name="feedback"
                value={projeto.feedback}
                placeholder="Digite o feedback do professor"
                onChange={(e) => setProjeto({ ...projeto, feedback: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            Cadastrar
        </button>
    </form>
</section>
  )
}
