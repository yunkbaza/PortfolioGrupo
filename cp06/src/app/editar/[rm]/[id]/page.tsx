"use client"
import { useEffect , useState } from "react";
import { TipoProjeto } from "@/types/types";
import { useParams , useRouter } from "next/navigation";

export default function Editar() {

  const params = useParams();
  const router = useRouter();
  const { rm, id } = params;
  const [projeto, setProjeto] = useState<TipoProjeto>({
    $id: '',
    nome: "",
    rm: "",
    desc: "",
    nota: 0,
    tipoAvaliacao: "",
    link: "",
    feedback: ""
  });

  const chamadaApi = async () => {
    try {
        const response = await fetch(`/api/base-projetos/${rm}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os projetos');
        }
        const data = await response.json();
        setProjeto(data);
    } catch (error) {
        console.error('Erro na chamada da API:', error);
        alert('Erro ao carregar os projetos. Tente novamente mais tarde.');
    }
};

  useEffect(() => {
    chamadaApi();
  }, [rm]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    
    e.preventDefault();
    try {
      const response = await fetch(`/api/base-projetos/${rm}/${id}`, {
        method: "PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(projeto),
      });
      
        if (response.ok) {
          const data = await response.json();
          alert("Produto atualizado com sucesso!");
          setProjeto({
            $id: '',
            nome: "",
            rm: "",
            desc: "",
            nota: 0,
            tipoAvaliacao: "",
            link: "",
            feedback: ""
          });
          router.push(`/lista-projetos/${rm}`)
          console.table(data);
        }
    } catch (error) {
      console.error("Falha na atualização: ",error);
    }
  }

  return (
<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Editar Projeto</h1>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="text-sm font-semibold mb-1">Nome:</label>
            <input
                type="text"
                name="nome"
                value={projeto.nome}
                placeholder="Digite o nome do projeto"
                required
                onChange={(e) => setProjeto({ ...projeto, nome: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full"
            />
        </div>
        <div>
            <label className="text-sm font-semibold mb-1">RM:</label>
            <input
                type="text"
                name="rm"
                value={projeto.rm}
                required
                onChange={(e) => setProjeto({ ...projeto, rm: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full"
            />
        </div>
        <div>
            <label className="text-sm font-semibold mb-1">Descrição:</label>
            <textarea
                name="desc"
                value={projeto.desc}
                placeholder="Fale um pouco sobre o projeto"
                required
                onChange={(e) => setProjeto({ ...projeto, desc: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full h-24"
            />
        </div>
        <div>
            <label className="text-sm font-semibold mb-1">Nota:</label>
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
                className="border border-gray-300 rounded-md p-2 w-full"
            />
        </div>
        <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-semibold mb-1">Tipo Avaliação:</label>
            <select
                name="tipoAvaliacao"
                value={projeto.tipoAvaliacao}
                required
                onChange={(e) => setProjeto({ ...projeto, tipoAvaliacao: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full"
            >
                <option value="">Selecione</option>
                <option value="cp">CheckPoint</option>
                <option value="gs">Global Solution</option>
                <option value="challenge">Challenge</option>
            </select>
        </div>
        <div>
            <label className="text-sm font-semibold mb-1">Link:</label>
            <input
                type="text"
                name="link"
                value={projeto.link}
                placeholder="Insira a URL da foto"
                onChange={(e) => setProjeto({ ...projeto, link: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full"
            />
        </div>
        <div>
            <label className="text-sm font-semibold mb-1">Feedback:</label>
            <textarea
                name="feedback"
                value={projeto.feedback}
                placeholder="Digite o FeedBack do professor"
                onChange={(e) => setProjeto({ ...projeto, feedback: e.target.value })}
                className="border border-gray-300 rounded-md p-2 w-full h-24"
            />
        </div>
        <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
            Editar
        </button>
    </form>
</div>

  )
}
