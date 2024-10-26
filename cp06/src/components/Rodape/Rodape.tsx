import Image from "next/image";
import fiap from "@/image/fiap.png";
import logo from "@/image/logo.png";


export default function Rodape() {
  return (
    <footer className="h-24 flex justify-between p-2">
        <div className="flex justify-center items-center">
        <Image  src={logo} alt="Logo" className="h-5 w-auto"/>
        <p className="text-sm">Portifólio<span className="text-verdeAgua">Seven</span></p>
        </div>
        <div className="flex flex-col justify-center items-center">
            <Image src={fiap} alt="Logo FIAP" className="w-14"/>
            <h2 className="text-xs">CheckPoint 6</h2>
            <h2 className="text-xs">Front-end</h2>
        </div>
    </footer>
  )
}
