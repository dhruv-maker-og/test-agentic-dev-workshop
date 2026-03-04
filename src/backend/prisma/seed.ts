import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)
  await prisma.user.upsert({
    where: { email: 'test@foodorder.com' },
    update: {},
    create: { email: 'test@foodorder.com', password: hashedPassword, name: 'Test User' },
  })

  const pizza = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Pizza Palace',
      description: 'Authentic Italian pizzas made fresh daily',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    },
  })

  const burger = await prisma.restaurant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Burger Barn',
      description: 'Juicy handcrafted burgers and sides',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    },
  })

  await prisma.menuItem.upsert({ where: { id: 1 }, update: {}, create: { restaurantId: pizza.id, name: 'Margherita Pizza', description: 'Classic tomato, mozzarella and basil', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' } })
  await prisma.menuItem.upsert({ where: { id: 2 }, update: {}, create: { restaurantId: pizza.id, name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and mozzarella', price: 11.99, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400' } })
  await prisma.menuItem.upsert({ where: { id: 3 }, update: {}, create: { restaurantId: pizza.id, name: 'Garlic Bread', description: 'Toasted with garlic butter', price: 3.99, imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400' } })
  await prisma.menuItem.upsert({ where: { id: 4 }, update: {}, create: { restaurantId: burger.id, name: 'Classic Burger', description: 'Beef patty, lettuce, tomato and special sauce', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' } })
  await prisma.menuItem.upsert({ where: { id: 5 }, update: {}, create: { restaurantId: burger.id, name: 'Cheese Burger', description: 'Classic burger with double cheese', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400' } })
  await prisma.menuItem.upsert({ where: { id: 6 }, update: {}, create: { restaurantId: burger.id, name: 'Fries', description: 'Crispy golden fries with sea salt', price: 2.99, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400' } })

  console.log('Seed data created successfully')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())