const { PrismaClient } = require("@prisma/client");
(async () => {
  const prisma = new PrismaClient();
  const logs = await prisma.emailLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log("\n=== Recent email attempts ===\n");
  logs.forEach((l, i) => {
    console.log(`[${i + 1}] ${l.status.toUpperCase()} - ${l.subject}`);
    console.log(`    To: ${l.to}`);
    console.log(`    When: ${l.createdAt}`);
    if (l.response) {
      const resp = l.response.substring(0, 300);
      console.log(`    Error: ${resp}${l.response.length > 300 ? "..." : ""}`);
    }
    console.log();
  });
  process.exit();
})();
