import { prisma } from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const batchLimit = 500

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await prisma.fruit.findMany({
            take: batchLimit
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json("failed to get fruits")
    }
}