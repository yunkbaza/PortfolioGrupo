import Cabecalho from "@/components/Cabecalho/Cabecalho";
import Menu from "@/components/Menu/Menu";
import Rodape from "@/components/Rodape/Rodape";

export default function ParticipantPage({ params }: { params: { nome: string } }) {

    return (
        <Cabecalho/>
        <Menu/>
        <Rodape/>
    );
}
