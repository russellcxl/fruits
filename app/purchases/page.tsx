import { Purchase } from '../../types/types';
import React from 'react';
import { Purchases } from "../../components/purchases";
import { prisma } from '../../prisma/client';

export default async function Page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, {
        cache: 'no-cache'
    })
    const data:Purchase[] = await res.json()
    return (
        <Purchases purchases={data} />
    )
}