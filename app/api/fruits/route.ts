import { prisma } from "../../../prisma/client";
import { Product } from "../../../types/types";

const batchLimit = 500

export async function GET() {
    try {
        const data = await prisma.fruit.findMany({
            take: batchLimit,
            orderBy: {
                name: 'asc'
            },
        })
        return new Response(JSON.stringify(data))
    } catch (e) {
        console.error(e)
        return Response.error()
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: Request) {
    try {
        const data: Product = await req.json()
        if (!validateFruit) {
            return new Response('Invalid params')
        }
        const fruit = await prisma.fruit.create({
            data
        });
        return new Response(JSON.stringify(fruit))
    } catch (e) {
        console.error(e)
        return Response.error()
    } finally {
        await prisma.$disconnect()
    }
}

function validateFruit(fruit: Product): Boolean {
    if (fruit.name == "" || fruit.price <= 0 || fruit.stock <= 0) {
        return false
    }
    return true
}