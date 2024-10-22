import { Databases, ID, Query } from "appwrite";
import client from "../../../../lib/appwrite_config";
import { NextResponse } from "next/server";
import { TipoAluno } from "@/types/types";


//Criar um objeto DATABASE passando o arquivo de configuração da plataforma.
const database = new Databases(client);

export async function getAll() {
    try {
        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,[Query.orderAsc("$createdAt")]);
        
        return response;
    } catch (error) {
        console.error("Erro na listagem dos alunos!", error);
        throw new Error("Falha na listagem de dados!");
    }    
}

export async function GET() {
    try {
        const alunos = await getAll();
        return NextResponse.json(alunos);
    } catch (error) {
        return NextResponse.json({error: "Falha na obtenção das informações."+ error}, {status:500})
    }
}

export async function createAluno(aluno:TipoAluno) {
    try {
        const response = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string, ID.unique(), aluno);

        return response;
    } catch (error) {
        console.error( "Erro ao criar aluno!", error);
        throw new Error("Falha ao criar aluno!");
    }
}

export async function POST(request:Request) {
    try {
        const{rm , nome , area , desc , github , linkedin , email} = await request.json();
        const aluno = {rm , nome , area , desc , github , linkedin , email} as TipoAluno;
        const response = await createAluno(aluno);
        // rm: string;
        // nome: string;
        // area: string;
        // desc: string;
        // projetos: {nome:string, desc:string, nota:number}[];
        // github: string;
        // linkedin: string;
        // email: string;

        return NextResponse.json(response,{status:201});
    } catch (error) {
        return NextResponse.json({error: "Falha na criação do aluno: " + error},{status:500});
    }
}