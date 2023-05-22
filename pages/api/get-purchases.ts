import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const batchLimit = 500

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await prisma.purchase.findMany({
            take: batchLimit,
            orderBy: {
                purchase_date: 'desc'
            },
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json("failed to get purchases")
    } finally {
        await prisma.$disconnect();
    }
}