import { prisma } from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type dataProps = {
    name: string,
    price: number,
    image_url: string,
    stock: number,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data:dataProps = JSON.parse(req.body)
        if (req.method === 'POST') {
            const fruit = await prisma.fruit.create({
                data
            });
            console.log("created fruit!");
            res.status(201).json(fruit);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch(e) {
        res.status(500).json("failed to add fruit to database")
    }
}