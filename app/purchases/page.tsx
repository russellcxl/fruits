"use client"

import { useEffect, useState } from 'react';
import { PurchasedItem } from '../components/types';

export default function Home() {
    const [data, setData] = useState<{
        purchase_date: string,
        purchase_value: number,
        purchased_items: PurchasedItem[],
    }[]>([]);
    useEffect(() => {
        const fetchResponse = async () => {
            const res = await fetch('/api/get-purchases');
            const data = await res.json();
            setData(data);
        };
        fetchResponse();
    }, []);
    return (
        <main className='bg-white'>
            <h1>PURCHASES</h1>
            {data.map((x) => (
                <li>{x.purchase_date}, {JSON.stringify(x.purchased_items)}, ${x.purchase_value}</li>
            ))}
        </main>
    )
}