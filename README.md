# Fruit POS

### Features
- Add fruits to a cart
- Checkout with cart items
- Records of purchases

### Schema
```
model fruit {
  id        Int     @id @default(autoincrement())
  name      String  @db.VarChar(200)
  price     Decimal @db.Decimal(10, 2)
  image_url String? @db.VarChar(255)
  stock     Int     @default(0)
}

model purchase {
  id              Int      @id @default(autoincrement())
  purchase_date   DateTime @db.Timestamp
  purchase_value  Decimal  @db.Decimal(10, 2)
  purchased_items Json
}
```

## Running the app
Install deps
```
npm i
```
Initialize DB
```
npx prisma migrate dev
npx prisma generate
```
Seed fruits
```
npx prisma db seed
```
Start app
```
npm run dev
```
