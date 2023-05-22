import { Purchase, PurchasedItem } from '../../components/types';
import React from 'react';
import { Purchases } from '../../components/purchases';
import prisma from '../../prisma/client';

const batchLimit = 500

export default async function Page() {
    const res = await getPurchases();
    const data: Purchase[] = JSON.parse(res);
    return (
        <Purchases purchases={data} />
    )
}

async function getPurchases() {
    const data = await prisma.purchase.findMany({
        take: batchLimit,
        orderBy: {
            purchase_date: 'desc'
        },
    })
    return JSON.stringify(data)
}