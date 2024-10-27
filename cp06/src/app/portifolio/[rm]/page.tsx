import Projeto from "@/components/Projeto/Projeto";
import aluno from "@/data/base.json";
import perfil from "@/image/perfil.png";
import Image from "next/image";
import Link from "next/link";


export default async function Portifolio({params}:{params: {rm:string}}) {
  
  const { rm } = await params

  const alunoSelecionado = aluno.find(aluno => aluno.rm === rm)


  return (
    <section className="w-full">
      <div className="flex flex-col items-center mt-5 w-full lg:flex-row lg:justify-around lg:mb-4">
        <Image src={perfil} alt="Perfil" className="w-1/3 lg:w-1/4 xl:w-1/5"/>
        <div className="text-center md:w-1/2 lg:w-1/3 xl:w-1/3">
          <h1 className="text-xl font-bold xl:text-3xl">{alunoSelecionado?.nomeCompleto}</h1>
          <p className="text-md p-2 text-left xl:text-lg">{alunoSelecionado?.desc}</p>
          <nav>
            <ul className="flex w-full justify-evenly mb-4">
              <li><Link href={alunoSelecionado?.github || `/portifolio/${rm}`} className="bg-verdeCard p-1 rounded-md md:p-2 hover:bg-verdeAgua duration-300 ">Github</Link></li>
              <li><Link href={alunoSelecionado?.linkedin || `/portifolio/${rm}`} className="bg-verdeCard p-1 rounded-md md:p-2 hover:bg-verdeAgua duration-300 ">Linkedin</Link></li>
              <li><Link href={"mailto:"+alunoSelecionado?.email || `/portifolio/${rm}`} className="bg-verdeCard p-1 rounded-md md:p-2 hover:bg-verdeAgua duration-300 ">Email</Link></li>
              <li><Link href={`/lista-projetos/${rm}`} className="bg-verdeCard p-1 rounded-md md:p-2 hover:bg-verdeAgua duration-300 ">Editar</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full md:flex-row md:w-11/12 mx-auto">
        <Projeto tipo="cp" rm={rm}/>
        <Projeto tipo="gs" rm={rm}/>
        <Projeto tipo="challenge" rm={rm}/> 
        <Projeto tipo="projetos" rm={rm}/> 
      </div>
    </section>
  )
}
