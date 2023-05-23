import { prisma } from "../../../prisma/client";
import { Purchase, PurchasedItem } from "../../../types/types";

const batchLimit = 500

export async function GET() {
    try {
        const data = await prisma.purchase.findMany({
            take: batchLimit,
            orderBy: {
                purchase_date: 'desc'
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
    const data: Purchase = await req.json()
    const addPurchase = prisma.purchase.create({
        data
    })
    const purchasedItems: PurchasedItem[] = data.purchased_items
    const updateTxns = purchasedItems.map((i) => {
        return prisma.fruit.update({
            where: {
                id: i.id,
            },
            data: {
                stock: {
                    decrement: i.quantity
                }
            },
        })
    })
    try {
        const res = await prisma.$transaction([addPurchase, ...updateTxns])
        return new Response(JSON.stringify(res))
    } catch (e) {
        return Response.error()
    } finally {
        await prisma.$disconnect();
    }
}