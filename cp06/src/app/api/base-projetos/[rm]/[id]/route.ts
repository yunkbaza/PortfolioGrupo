import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../../../../../lib/appwrite_config";
import { TipoProjeto } from "@/types/types";

const database = new Databases(client);

export async function GET(request: Request, context: { params: { rm: string; id: string } }) {
    const { rm, id } = context.params;
    
    try {
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        const projeto = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string, id);
        
        return NextResponse.json(projeto);
    } catch (error) {
        console.error("Erro na obtenção do projeto: ", error);
        return NextResponse.json({ error: "Falha na obtenção da informação." + error }, { status: 500 });
    }
}

export async function PUT(request: Request, context: { params: { rm: string; id: string } }) {
    const { rm, id } = context.params;
    
    try {
        const { nome, desc, nota, tipoAvaliacao, link, feedback } = await request.json();
        const projeto = { nome, desc, nota, tipoAvaliacao, link, feedback } as TipoProjeto;
        
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string, id, projeto);
        
        return NextResponse.json({ msg: "Projeto alterado com sucesso!" });
    } catch (error) {
        console.error("Falha na atualização do projeto: ", error);
        return NextResponse.json({ error: "Falha na atualização do projeto: " + error }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: { rm: string; id: string } }) {
    const { rm, id } = context.params;
    
    try {
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string, id);
        
        return NextResponse.json({ status: 204 });
    } catch (error) {
        console.error("Falha na exclusão do projeto: ", error);
        return NextResponse.json({ error: "Falha na exclusão do projeto: " + error }, { status: 500 });
    }
}
