import Projeto from "@/components/Projeto/Projeto";
import aluno from "@/data/base.json";

export default async function Portifolio({params}:{params: {rm:string}}) {
  
  const { rm } = await params

  const alunoSelecionado = aluno.find(aluno => aluno.rm === rm)


  return (
    <section>
      <div>
        <h1>{alunoSelecionado?.nomeCompleto}</h1>
        <p>{alunoSelecionado?.email}</p>
        <p>{alunoSelecionado?.desc}</p>
      </div>
      <div className="flex flex-col gap-4">
        <Projeto tipo="cp" rm={rm}/>
        <Projeto tipo="gs" rm={rm}/>
        <Projeto tipo="challenge" rm={rm}/> 
        <Projeto tipo="projetos" rm={rm}/> 
      </div>
    </section>
  )
}
