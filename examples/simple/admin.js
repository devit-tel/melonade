const { Admin } = require("@melonade/melonade-client");

const TOTAL_TRANSACTION = 1;
const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

console.log("Registering workers");

const adminClient = new Admin({
  kafkaServers,
  namespace
});

const startTime = new Date().toISOString();
for (let i = 0; i < TOTAL_TRANSACTION; i++) {
  const transactionId = `${i}-${startTime}`;
  console.log(`Starting transactionId: ${transactionId}`);
  adminClient.startTransaction(
    transactionId,
    {
      name: "simple",
      rev: "1"
    },
    {
      hello: "world"
    }
  );
}
