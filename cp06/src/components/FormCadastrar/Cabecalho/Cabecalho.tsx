import Image from "next/image";
import alunos from "@/data/base.json";
import Link from "next/link";

import logo from  "@/image/logo.png";

export default function Cabecalho() {
  return (
    <header className="h-20 flex justify-center flex-col items-center p-2 gap-1 border-b-2 border-b-verdeAgua">
        <div className="h-10 flex items-center">
        <Image src={logo} alt="Logo Seven Portifólios" className="h-10 w-auto"/>
        <p className="text-xl">Portifólio<span className="text-verdeAgua">Seven</span></p>
        </div>
        <nav>
            <ul className="flex justify-evenly w-screen">
                {alunos.map((aluno) => (
                    <li key={aluno.rm}><Link href={/portifolio/${aluno.rm}} className="hover:border-b-2 border-b-black font-bold text-md">{aluno.nome}</Link></li>
                ))}
            </ul>
        </nav>
    </header>
    )
}