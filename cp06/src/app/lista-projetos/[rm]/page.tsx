"use client"
import { TipoProjeto } from '@/types/types';
import { useEffect, useState } from 'react';
import aluno from '@/data/base.json';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ListaProjetos() {
    const params = useParams();
    const alunoSelecionado = aluno.find(aluno => aluno.rm === params.rm);
    const [listaProjetos, setListaProjetos] = useState<TipoProjeto[]>([]);

    const chamadaApi = async () => {
        try {
            const response = await fetch(`/api/base-projetos/${params.rm}`);
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
    },  [params.rm]);


    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/base-projetos/${params.rm}/${id}`, {
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
            <div className='flex gap-10 items-center'>
            <div>
            <h2 className="text-xl font-semibold">Projetos</h2>
            <h2 className="text-lg">Aluno: {alunoSelecionado?.nome}</h2>
            </div>
            <nav>
                <Link href={"/cadastro-projetos"} className="text-xl bg-verdeCard hover:bg-verdeAgua p-2 rounded-2xl duration-300">Cadastrar</Link>
            </nav>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
                {listaProjetos && listaProjetos.length > 0 ? (
                    listaProjetos.map((projeto: TipoProjeto) => (
                        <div key={projeto.$id} className="border border-gray-300 p-4 rounded-lg">
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">Nome do projeto:</p>
                                <p className="text-sm lg:text-xl">{projeto.nome}</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">RM:</p>
                                <p className="text-sm lg:text-xl">{projeto.rm}</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">Descrição:</p>
                                <p className="text-sm lg:text-xl">{projeto.desc}</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">Nota:</p>
                                <p className="text-sm lg:text-xl">{projeto.nota}</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">Tipo Avaliação:</p>
                                <p className="text-sm lg:text-xl">{projeto.tipoAvaliacao}</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">Link:</p>
                                <Link className="text-sm" href={projeto.link} target="_blank"></Link>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold text-sm lg:text-xl text-gray-700">Feedback:</p>
                                <p className="text-sm lg:text-xl">{projeto.feedback}</p>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={() => handleDelete(projeto.$id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs lg:text-xl"
                                >
                                    Deletar
                                </button>
                                <Link
                                    href={`/editar/${projeto.rm}/${projeto.$id}`}
                                    className="bg-verdeCard hover:bg-verdeAgua text-black py-1 px-2 rounded text-xs lg:text-xl"
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