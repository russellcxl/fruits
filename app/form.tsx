import { useState } from 'react';

export default function MyForm() {
    const [fruitName, setFruitName] = useState('');
    const [fruitPrice, setFruitPrice] = useState('');
    const [fruitImage, setFruitImage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/add-fruit', {
            method: 'POST',
            body: JSON.stringify({ name: fruitName, price: fruitPrice, image_url: fruitImage })
        });
        if (response.ok) {
            console.log('Fruit added successfully!');
        } else {
            console.error('Error adding fruit!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Fruit Name:
                <input type="text" value={fruitName} onChange={(e) => setFruitName(e.target.value)} />
            </label>
            <br />
            <label>
                Fruit Price:
                <input type="text" value={fruitPrice} onChange={(e) => setFruitPrice(e.target.value)} />
            </label>
            <br />
            <label>
                Fruit Price:
                <input type="text" value={fruitImage} onChange={(e) => setFruitImage(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Fruit</button>
        </form>
    );
}