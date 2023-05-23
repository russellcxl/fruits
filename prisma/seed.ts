import { PrismaClient } from '@prisma/client'

// RUN `npx prisma db seed`

const prisma = new PrismaClient()
const data = [
    {
        name: "Apple",
        price: 1.50,
        image_url: "https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg",
        stock: 100
    },
    {
        name: "Pear",
        price: 2.20,
        image_url: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/285430_2200-732x549.jpg",
        stock: 100
    },
    {
        name: "Banana",
        price: 0.90,
        image_url: "https://foodandnutrition.org/wp-content/uploads/SavorBananas.jpg",
        stock: 100
    },
    {
        name: "Lemon",
        price: 1.90,
        image_url: "https://cdn.britannica.com/84/188484-050-F27B0049/lemons-tree.jpg",
        stock: 100
    },
    {
        name: "Grapes",
        price: 5.90,
        image_url: "https://drdavinahseats.com/wp-content/uploads/2022/03/grapes-on-keto-long.jpg",
        stock: 100
    },
    {
        name: "Guava",
        price: 3.90,
        image_url: "https://www.shape.com/thmb/gxkgfgm-EVmPOKwpNGp3ziU8Wyo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/guava-promo-0f9f6443ec6b4b63897463ee30cfddf0.jpg",
        stock: 100
    },
    {
        name: "Tomato",
        price: 0.50,
        image_url: "https://cdn.britannica.com/84/188484-050-F27B0049/lemons-tree.jpg",
        stock: 100
    }
]

async function main() {
    const count = await prisma.fruit.count()
    if (count > 0) return
    await prisma.fruit.createMany({
        data: data
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })