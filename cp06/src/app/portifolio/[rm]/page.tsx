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
      <div>
        <div><h2>CheckPoint</h2></div>
        <div><h2>Global Solution</h2></div>
        <div><h2>Challenge</h2></div>
        <div><h2>Projetos</h2></div>
      </div>
    </section>
  )
}
