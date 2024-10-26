import Projeto from "@/components/Projeto/Projeto";
import aluno from "@/data/base.json";
import perfil from "@/image/perfil.png";
import Image from "next/image";


export default async function Portifolio({params}:{params: {rm:string}}) {
  
  const { rm } = await params

  const alunoSelecionado = aluno.find(aluno => aluno.rm === rm)


  return (
    <section className="w-full">
      <div className="flex flex-col items-center mt-5 w-full">
        <Image src={perfil} alt="Perfil" className="w-1/2"/>
        <h1 className="text-xl font-bold">{alunoSelecionado?.nomeCompleto}</h1>
        <p className="text-md">{alunoSelecionado?.email}</p>
        <p className="text-md p-2">{alunoSelecionado?.desc}</p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Projeto tipo="cp" rm={rm}/>
        <Projeto tipo="gs" rm={rm}/>
        <Projeto tipo="challenge" rm={rm}/> 
        <Projeto tipo="projetos" rm={rm}/> 
      </div>
    </section>
  )
}
