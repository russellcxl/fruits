import { prisma } from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type purchase = {
    customer_name: string,
    customer_phone_number: string,
    purchase_date: Date,
    purchase_value: number,
    purchased_items: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // TODO: add validation for req.body
        const data:purchase = JSON.parse(req.body)
        if (req.method === 'POST') {
            const purchase = await prisma.purchase.create({
                data
            });
            res.status(201).json(purchase);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (e) {
        res.status(500).json("failed to add fruit to database")
    }
}