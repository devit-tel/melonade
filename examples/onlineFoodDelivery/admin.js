const { Admin } = require("@melonade/melonade-client");

const TOTAL_TRANSACTION = 1;
const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

const adminClient = new Admin({
  kafkaServers,
  namespace
});

const startTime = new Date().toISOString();

adminClient.producer.on("ready", () => {
  for (let i = 0; i < TOTAL_TRANSACTION; i++) {
    const transactionId = `${i}-${startTime}`;
    console.log(`Starting transactionId: ${transactionId}`);
    adminClient.startTransaction(
      transactionId,
      {
        name: "online_food_delivery",
        rev: "beta-1"
      },
      {
        pickupLocation: "ABC fire chicken",
        deliveryLocation: "My house",
        user: {
          name: "Me",
          _id: "My_ID"
        },
        payment: {
          price: 200,
          type: "APP_WALLET", // CREDIT_CARD | APP_WALLET | CASH
          driverCost: 10
        },
        foods: ["#1 set", "Fire chicken", "Cola"]
      }
    );
  }
});
