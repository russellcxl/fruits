-- CreateTable
CREATE TABLE "fruit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image_url" VARCHAR(255),
    "stock" INTEGER NOT NULL,

    CONSTRAINT "fruit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "customer_name" VARCHAR(255) NOT NULL,
    "customer_phone_number" VARCHAR(20) NOT NULL,
    "purchase_date" DATE NOT NULL,
    "purchase_value" DECIMAL(10,2) NOT NULL,
    "purchased_items" JSONB NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);
