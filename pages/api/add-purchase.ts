import { Purchase, PurchasedItem } from "../../components/types";
import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return
    const data:Purchase = JSON.parse(req.body)
    const addPurchase = prisma.purchase.create({
        data
    })
    const purchasedItems:PurchasedItem[] = data.purchased_items
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
        await prisma.$transaction([addPurchase, ...updateTxns])
        res.status(200).json("Successfully added purchase!")
    } catch (e) {
        res.status(500).json("failed to add purchase to database")
    } finally {
        await prisma.$disconnect();
    }
}