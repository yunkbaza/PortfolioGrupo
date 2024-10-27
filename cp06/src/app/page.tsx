import Image from "next/image";
import imgInicio from "@/image/foto-inicial.png";

export default function Home() {
  return (
    <>
      <section>
        <div className="flex flex-col items-center md:flex-row sm:w-2/3 sm:mx-auto">
        <div className="w-11/12 mx-auto sm:w-2/3 sm:pl-4">
          <p className="text-left md:text-xl lg:text-2xl xl:text-3xl">Projeto de portfólio desenvolvido como trabalho para a FIAP, com funcionalidades CRUD integradas via Appwrite, usando Next.js e Tailwind para a interface.</p>
        </div>
        <div className="md:w-1/2">
          <Image src={imgInicio} alt="Foto  inicial" className="w-4/5 mx-auto sm:w-full"/>
        </div>
        </div>
      </section>
    </>
  );
}