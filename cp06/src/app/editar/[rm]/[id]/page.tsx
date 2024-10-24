"use client"
import { useEffect , useState } from "react";
import { TipoProjeto } from "@/types/types";
import alunos from '@/data/base.json';
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
    foto: "",
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
            foto: "",
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
    <div><h1>Editar Projeto</h1>
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
            <button type="submit">Editar</button>
        </form>
    </div>
  )
}
