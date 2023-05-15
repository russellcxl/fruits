import { prisma } from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type dataProps = {
    name: string,
    price: number,
    image_url: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {        
        // TODO: add validation for req.body
        const data:dataProps = JSON.parse(req.body)
        if (req.method === 'POST') {
            console.log("adding fruit");
            console.log(data);
            
            const fruit = await prisma.fruit.create({
                data
            });
            res.status(201).json(fruit);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch(e) {
        res.status(500).json("failed to add fruit to database")
    }
}