import Link from "next/link"

export default function Erro() {
  return (
    <section className="text-center flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Erro 404</h1>
        <p className="text-lg font-semibold">Parece que você não está onde deveria estar.</p>
        <nav>
            <Link href={"/"} className="bg-verdeCard p-2 rounded-2xl hover:bg-verdeAgua duration-300">Voltar para o Inicio</Link>
        </nav>
    </section>
  )
}