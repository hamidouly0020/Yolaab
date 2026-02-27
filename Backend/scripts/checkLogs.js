const { PrismaClient } = require("@prisma/client");
(async () => {
  const prisma = new PrismaClient();
  const logs = await prisma.emailLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  console.log("Recent email logs:");
  console.table(
    logs.map((l) => ({
      id: l.id,
      to: l.to,
      status: l.status,
      subject: l.subject,
      createdAt: l.createdAt,
    })),
  );
  process.exit();
})();
