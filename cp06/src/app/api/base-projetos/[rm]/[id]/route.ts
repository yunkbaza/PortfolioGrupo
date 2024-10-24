import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../../../../../lib/appwrite_config";
import { TipoProjeto } from "@/types/types";

const database = new Databases(client);

export async function getById(id:string , rm:string) {
    try {
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        const response = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string, id);
        
        return response;
    } catch (error) {
        console.error("Erro na listagem dos projetos!", error);
        throw new Error("Falha na listagem de projetos!");
    }    
}

export async function GET(request:Request,{params}:{params:{rm:string , id:string}}) {
    try {

        const idProjeto = params.id;
        const rm = params.rm;

        const projeto = await getById(idProjeto , rm);
        
        return NextResponse.json(projeto);

    } catch (error) {
        return NextResponse.json({error: "Falha na obtenção da informação."+ error}, {status:500})
    }
}

export async function atualizaProjeto(rm:string , idProjeto:string , projeto:TipoProjeto) {

    try {
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];

        const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string, idProjeto, projeto);
        
        return response;
    } catch (error) {
        console.error("Erro na atualização do projeto!", error);
        throw new Error("Falha na alteração do projeto!");
    }    
}

export async function PUT(request:Request,{params}:{params:{rm:string , id:string}}) {
    
    try {
        const {nome , desc , nota , tipoAvaliacao , foto , feedback} = await request.json();
        const projeto = {nome , desc , nota , tipoAvaliacao , foto , feedback} as TipoProjeto;
        const rm = params.rm;
        const idProjeto = params.id;
        await atualizaProjeto(rm , idProjeto , projeto);

        return NextResponse.json({msg:"Projeto alterado com sucesso!"});

    } catch (error) {
        console.error("Falha na atualização do projeto: ", error);
        return NextResponse.json({error:"Falha na atualização do projeto: "+error});
    }
}

export async function DELETE(request:Request,{params}:{params:{id:string , rm:string}}) {

    try {
        const rm = params.rm;
        const idProjeto = params.id
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        await database.deleteDocument (process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string, idProjeto);
        return NextResponse.json({status:204});

    } catch (error) {
        console.error("Falha na exclusão do produto: ", error);
        return NextResponse.json({error:"Falha na exclusão do produto: "+error},{status:500});
    }

}