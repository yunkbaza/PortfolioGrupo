export type TipoAluno = {
    $id: string;
    rm:string;
    nome:string;
    nomeCompleto:string;
    area:string;
    desc:string;
    github:string;
    linkedin:string;
    email:string;
}

export type TipoProjeto = {
    $id: string;
    nome:string; // 30
    rm:string; // 6
    desc:string; // 200
    nota:number; // 0-10
    tipoAvaliacao:string; // 15
    link:string; // 100
    feedback:string; // 150
}