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
        nota: undefined,
        tipoAvaliacao: "",
        foto: "",
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
                    nota:undefined,
                    tipoAvaliacao: "",
                    foto: "",
                    feedback: "",
                });
                console.table(data)
            }
        } catch (error) {
            console.error("Falha no carregamento: " , error);
        }
    }

  return (
    <div>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={projeto.nome} placeholder="Digite o nome do projeto" required onChange={(e) => setProjeto({ ...projeto, nome: e.target.value })} />
            </div>
            <div>
                <label>RM:</label>
                <input type="text" name="rm" value={projeto.rm} required onChange={(e) => setProjeto({ ...projeto, rm: e.target.value })} />
                <select name="tipoAvaliacao" value={projeto.rm} required onChange={(e) =>  setProjeto({ ...projeto, rm: e.target.value })}>
                        <option value="">Selecione</option>
                    {alunos.map((aluno) => (
                        <option value={aluno.rm} key={aluno.rm}>{aluno.rm}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Descrição:</label>
                <textarea name="desc" value={projeto.desc} placeholder="Fale um pouco sobre o projeto" required onChange={(e) => setProjeto({ ...projeto, desc: e.target.value })} />
            </div>
            <div>
                <label>Nota:</label>
                <input type="number" step={.01} name="nota" value={projeto.nota} placeholder="Insira a nota obtida" required onChange={(e) => setProjeto({ ...projeto, nota: parseFloat(e.target.value) })} min={0} max={10} />
            </div>
            <div>
                <label>Tipo Avaliação:</label>
                <select name="tipoAvaliacao" value={projeto.tipoAvaliacao} required onChange={(e) => setProjeto({ ...projeto, tipoAvaliacao: e.target.value })} >
                    <option value="">Selecione</option>
                    <option value="cp">CheckPoint</option>
                    <option value="gs">Global Solution</option>
                    <option value="challenge">Challenge</option>
                </select>
            </div>
            <div>
                <label>Foto:</label>
                <input type="text" name="foto" value={projeto.foto} placeholder="Insira a URL da foto" onChange={(e) => setProjeto({ ...projeto, foto: e.target.value })} />
            </div>
            <div>
                <label>Feedback:</label>
                <textarea name="feedback" value={projeto.feedback} placeholder="Digite o FeedBack do professor" onChange={(e) => setProjeto({ ...projeto, feedback: e.target.value })} />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
  )
}