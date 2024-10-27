import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../../../../lib/appwrite_config";

const database = new Databases(client);

export async function getByRm(rm:string) {
    try {
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, collectionId as string);
        
        return response.documents;
    } catch (error) {
        console.error("Erro na listagem dos projetos!", error);
        throw new Error("Falha na listagem de projetos!");
    }    
}

export async function GET(request:Request,context:{params:{rm:string}}) {
    const { rm } = context.params;
    try {

        

        const documentos = await getByRm(rm);
        
        return NextResponse.json(documentos);

    } catch (error) {
        return NextResponse.json({error: "Falha na obtenção da informação."+ error}, {status:500})
    }
}