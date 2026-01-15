import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const event1 = await prisma.event.upsert({
    where: { id: "seed-event-1" },
    update: {},
    create: {
      id: "seed-event-1",
      title: "Annual Quran Competition",
      description: "Join our annual competition featuring reciters from all over the region. Prizes include scholarships and gift certificates.",
      date: new Date("2026-03-15"),
      location: "Main Hall, Institute Campus",
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: "seed-event-2" },
    update: {},
    create: {
      id: "seed-event-2",
      title: "Introduction to Tajweed",
      description: "A 4-week workshop for beginners wanting to improve their Quranic recitation and pronunciation.",
      date: new Date("2026-02-10"),
      location: "Room 101, Education Building",
    },
  });

  console.log({ event1, event2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
