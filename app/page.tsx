"use client"

import { useEffect, useState } from 'react';
import MyForm from './form';

export default function Home() {
  const [response, setResponse] = useState<{name: string, price: number, image_url: string}[]>([]);
  let data:{name: string, price: number, image_url: string}[] = []
  useEffect(() => {
    const fetchResponse = async () => {
      const res = await fetch('/api/get-fruits');
      const text = await res.json();
      setResponse(text);
    };
    fetchResponse();
  }, []);
  return (
    <main>
      {response.map((fruit) => (
        <h1>{fruit.name}, {fruit.price}, {fruit.image_url}</h1>
      ))}

      <MyForm/>
    </main>
  )
}
