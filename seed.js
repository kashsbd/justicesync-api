const $prisma = require("./src/lib/$prisma");

async function main() {
  const kash = await $prisma.user.upsert({
    where: { email: "kash@gmail.com" },
    update: {},
    create: {
      email: "kash@gmail.com",
      password: "1234",
      salutation: "Mr.",
      firstName: "kash",
      lastName: "sbd",
      initials: "KS",
      roleType: "Lawyer",
      globalHourlyRate: 1000.0,
      phno: "123456789",
    },
  });
  console.log(kash);
}
main()
  .then(async () => {
    await $prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await $prisma.$disconnect();
    process.exit(1);
  });
