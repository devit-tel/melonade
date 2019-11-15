// If you just exit the program.
// Please give some time before start again
// (for last consumer to be timedout)

const { Worker, Admin, taskStates } = require("@melonade/melonade-client");

const TOTAL_TRANSACTION = 1;
const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log("Registering workers");

const adminClient = new Admin({
  kafkaServers,
  namespace
});

const findDriverWorker = new Worker(
  "find_driver",
  async task => {
    console.log(`Searching for driver near: ${task.input.pickupLocation}`);
    await sleep(200);
    console.log("Found a driver, sending message to driver");

    // Simulate waiting for driver accept on mobile app
    setTimeout(() => {
      findDriverWorker.updateTask(task, {
        status: taskStates.Completed,
        output: {
          driver: {
            _id: "someId",
            name: "john"
          }
        }
      });
    }, 5000);

    // You can make task as inprogress and update it later
    return {
      status: taskStates.Inprogress
    };


    // If want task to failed just throw an error or return status = failed

    // throw new Error('Just error')
    // return {
    //   status: taskStates.Failed
    // }
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

const sendOrderToStoreWorker = new Worker(
  "send_order_to_store",
  async task => {
    console.log("Sending order to store");
    await sleep(200);
    console.log("Store accepted order");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

const storePreparingFoodWorker = new Worker(
  "store_preparing_food",
  async task => {
    console.log("Store preparing food");
    await sleep(200);
    console.log("Food are ready");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

const driverOnTheWayToStoreWorker = new Worker(
  "driver_on_the_way_to_store",
  async task => {
    console.log("Driver driving to the store");
    await sleep(200);
    console.log("Driver arrived at store");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

const driverOnTheWayToCustomerWorker = new Worker(
  "driver_on_the_way_to_customer",
  async task => {
    console.log("Driver driving from store to you");
    await sleep(200);
    console.log("Driver arrived");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

const waitForDriverRecivedCashFromCustomerWorker = new Worker(
  "wait_for_driver_recived_cash_from_customer",
  async task => {
    console.log("Driver waiting for cash");
    await sleep(200);
    console.log("Cash accepted");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

const takeMoneyFromCreditCardWorker = new Worker(
  "take_money_from_credit_card",
  async task => {
    console.log("Requesting payment from bank");
    await sleep(200);
    console.log("Payment accepted from bank");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);


const takeMoneyFromAppWalletWorker = new Worker(
  "take_money_from_app_wallet",
  async task => {
    console.log("Requesting payment");
    await sleep(200);
    console.log("Payment accepted");

    return {
      status: taskStates.Completed
    };
  },
  undefined,
  {
    kafkaServers,
    namespace
  }
);

// Wait for wokers and admin client connected to kafka
setTimeout(() => {
  const startTime = new Date().toISOString();
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
          type: "CREDIT_CARD",
          driverCost: 10
        },
        foods: ["#1 set", "Fire chicken", "Cola"]
      }
    );
  }
}, 5000);
