import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../../../../lib/appwrite_config";
import { TipoAluno } from "@/types/types";

const database = new Databases(client);

export async function getById(rm:string) {
    try {
        const response = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, rm);
        
        return response;
    } catch (error) {
        console.error("Erro na listagem dos alunos!", error);
        throw new Error("Falha na listagem de dados!");
    }    
}

export async function GET(request:Request,{params}:{params:{rm:number}}) {
    try {

        const idAluno = params.rm.toString();

        const aluno = await getById(idAluno);
        
        return NextResponse.json(aluno);

    } catch (error) {
        return NextResponse.json({error: "Falha na obtenção da informação."+ error}, {status:500})
    }
}

export async function atualizaAluno(rm:number,aluno:TipoAluno) {
    try {
        const response = await database.updateDocument (process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, rm.toString(), aluno);
        
        return response;
    } catch (error) {
        console.error("Erro na atualização do aluno!", error);
        throw new Error("Falha na alteração do aluno!");
    }    
}

export async function PUT(request:Request,{params}:{params:{rm:number}}) {
    
    try {
        const {rm , nome , area , desc , github , linkedin , email} = await request.json();
        const aluno = {rm , nome , area , desc , github , linkedin , email} as TipoAluno;
        await atualizaAluno(params.rm,aluno);

        return NextResponse.json({msg:"Aluno alterado com sucesso!"});

    } catch (error) {
        console.error("Falha na atualização do aluno: ", error);
        return NextResponse.json({error:"Falha na atualização do aluno: "+error});
    }

}