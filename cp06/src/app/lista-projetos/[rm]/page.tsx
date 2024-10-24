"use client"
import { TipoProjeto } from '@/types/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import aluno from '@/data/base.json';
import Link from 'next/link';

export default function ListaProjetos({ params }: { params: { rm: string } }) {
    const { rm } = params;
    const alunoSelecionado = aluno.find(aluno => aluno.rm === rm);
    const [listaProjetos, setListaProjetos] = useState<TipoProjeto[]>([]);

    const chamadaApi = async () => {
        try {
            const response = await fetch(`/api/base-projetos/${rm}`);
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
    },  [rm]);


    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/base-projetos/${rm}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Produto deletado com sucesso");
                chamadaApi();
            } else {
                throw new Error('Erro ao deletar o produto');
            }
        } catch (error) {
            console.error("Erro na exclusão do produto:", error);
            alert('Erro ao deletar o produto. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Projetos</h2>
            <h2>Aluno: {alunoSelecionado?.nome}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome do projeto</th>
                        <th>RM</th>
                        <th>Descrição</th>
                        <th>Nota</th>
                        <th>Tipo Avaliação</th>
                        <th>Foto</th>
                        <th>Feedback</th>
                        <th>Deletar | Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProjetos.length > 0 ? (
                        listaProjetos.map((projeto: TipoProjeto) => (
                            <tr key={projeto.$id}>
                                <td>{projeto.nome}</td>
                                <td>{projeto.rm}</td>
                                <td>{projeto.desc}</td>
                                <td>{projeto.nota}</td>
                                <td>{projeto.tipoAvaliacao}</td>
                                <td><Image src='' alt="Foto do Projeto" width={100} height={100} /></td>
                                <td>{projeto.feedback}</td>
                                <td>
                                    <button onClick={() => handleDelete(projeto.$id)}>Deletar</button><Link href={`/editar/${projeto.rm}/${projeto.$id}`}>Editar</Link>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>Nenhum projeto encontrado</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>Total de projetos</td>
                        <td>{listaProjetos.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
