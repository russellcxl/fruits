"use client"

import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState<{
        purchase_date: string,
        purchase_value: number,
        purchased_items: string,
    }[]>([]);
    useEffect(() => {
        const fetchResponse = async () => {
            const res = await fetch('/api/get-purchases');
            let data = await res.json();
            setData(data);
        };
        fetchResponse();
    }, []);
    return (
        <main>
            <h1>PURCHASES</h1>
            {data.map((x) => (
                <li>{x.purchase_date}, {x.purchased_items}, ${x.purchase_value}</li>
            ))}
        </main>
    )
}