"use client"

import { useEffect, useState } from 'react';
import { Purchase, PurchasedItem } from '../../components/types';
import React from 'react';
import { Purchases } from '../../components/purchases';

export default function Home() {
    const [data, setData] = useState<Purchase[]>([]);
    useEffect(() => {
        const fetchResponse = async () => {
            const res = await fetch('/api/get-purchases');
            const data: Purchase[] = await res.json();
            const parsedData = data.map((purchase) => {
                return {
                    ...purchase,
                    purchase_date: new Date(purchase.purchase_date),
                }
            })
            setData(parsedData);
        };
        fetchResponse();
    }, []);
    return (
        <Purchases purchases={data} />
    )
}