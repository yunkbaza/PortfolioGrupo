import { Databases, ID } from "appwrite";
import client from "../../../../lib/appwrite_config";
import { NextResponse } from "next/server";
import { TipoProjeto } from "@/types/types";

const database = new Databases(client);

// export async function createProjeto(projeto: TipoProjeto, rm: string) {
//     try {
//         const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
//         const response = await database.createDocument(
//             process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
//             collectionId as string,
//             ID.unique(),
//             projeto
//         );
//         return response;
//     } catch (error) {
//         console.error("Erro ao criar projeto!", error);
//         throw new Error("Falha ao criar projeto!");
//     }
// }

export async function POST(request: Request) {
    try {
        const { nome, rm, desc, nota, tipoAvaliacao, link, feedback } = await request.json();
        const projeto = { nome, rm, desc, nota, tipoAvaliacao, link, feedback } as TipoProjeto;
        // const id = projeto.rm
        const collectionId = process.env[`NEXT_PUBLIC_APPWRITE_COLLECTION_ID_${rm}`];
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
            collectionId as string,
            ID.unique(),
            projeto);

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Falha na criação do projeto: " + error }, { status: 500 });
    }
}