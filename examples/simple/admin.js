const { Admin } = require("@melonade/melonade-client");

const TOTAL_TRANSACTION = 1;
const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

const adminClient = new Admin({
  kafkaServers,
  namespace
});

const startTime = new Date().toISOString();
adminClient.on("ready", () => {
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
      },
      ['aa', 'bb', 'cc']
    );
  }
}).on('error', console.log)
