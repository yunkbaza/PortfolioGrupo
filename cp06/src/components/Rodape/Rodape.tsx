import Image from "next/image";
import fiap from "@/image/fiap.png";
import logo from "@/image/logo.png";


export default function Rodape() {
  return (
    <footer className="h-24 flex justify-between p-2">
        <div className="flex justify-center items-center">
        <Image  src={logo} alt="Logo" className="h-5 w-auto sm:h-9 lg:h-16"/>
        <p className="text-sm sm:text-md lg:text-2xl">Portifólio<span className="text-verdeAgua">Seven</span></p>
        </div>
        <div className="flex flex-col justify-center items-center">
            <Image src={fiap} alt="Logo FIAP" className="w-14 sm:w-20 lg:w-32"/>
            <h2 className="text-xs sm:text-sm lg:text-xl">CheckPoint 6</h2>
            <h2 className="text-xs sm:text-sm lg:text-xl">Front-end</h2>
        </div>
    </footer>
  )
}
