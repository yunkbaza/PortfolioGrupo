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
        <div className="w-11/12 sm:p-4">
        <h2 className="text-xl font-semibold mb-2">Projetos</h2>
        <h2 className="text-lg mb-4">Aluno: {alunoSelecionado?.nome}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {listaProjetos.length > 0 ? (
                listaProjetos.map((projeto: TipoProjeto) => (
                    <div key={projeto.$id} className="border border-gray-300 p-4 rounded-lg">
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">Nome do projeto:</p>
                            <p className="text-sm">{projeto.nome}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">RM:</p>
                            <p className="text-sm">{projeto.rm}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">Descrição:</p>
                            <p className="text-sm">{projeto.desc}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">Nota:</p>
                            <p className="text-sm">{projeto.nota}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">Tipo Avaliação:</p>
                            <p className="text-sm">{projeto.tipoAvaliacao}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">Foto:</p>
                            <Image src="" alt="Foto do Projeto" width={80} height={80} className="rounded-md" />
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold text-sm text-gray-700">Feedback:</p>
                            <p className="text-sm">{projeto.feedback}</p>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => handleDelete(projeto.$id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs"
                            >
                                Deletar
                            </button>
                            <Link
                                href={/editar/${projeto.rm}/${projeto.$id}}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs"
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 text-sm">
                    Nenhum projeto encontrado
                </div>
            )}
        </div>
    </div>
    );
}
