const { Worker, TaskStates } = require("@melonade/melonade-client");

const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const compensateTask = task => {
  console.log(`Compensating: ${task.taskName}`);
  return {
    status: TaskStates.Completed
  };
};

console.log("Registering workers");

const findDriverWorker = new Worker(
  "find_driver",
  async task => {
    console.log(`Searching for driver near: ${task.input.pickupLocation}`);
    await sleep(200);
    console.log("Found a driver, sending message to driver");

    // Simulate waiting for driver accept on mobile app
    setTimeout(() => {
      console.log("Driver accepted the job");
      findDriverWorker.updateTask(task, {
        status: TaskStates.Completed,
        output: {
          driver: {
            _id: "someId",
            name: "john"
          }
        }
      });
    }, 2000);

    // You can make task as inprogress and update it later
    return {
      status: TaskStates.Inprogress
    };

    // If want task to failed just throw an error or return status = failed

    // throw new Error('Just error')
    // return {
    //   status: taskStates.Failed
    // }
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const sendOrderToStoreWorker = new Worker(
  "send_order_to_store",
  async task => {
    console.log("Sending order to store");
    await sleep(200);
    console.log("Store accepted order");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const storePreparingFoodWorker = new Worker(
  "store_preparing_food",
  async task => {
    console.log("Store preparing food");
    await sleep(200);
    console.log("Food are ready");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const driverOnTheWayToStoreWorker = new Worker(
  "driver_on_the_way_to_store",
  async task => {
    console.log("Driver driving to the store");
    await sleep(200);
    console.log("Driver arrived at store");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const driverOnTheWayToCustomerWorker = new Worker(
  "driver_on_the_way_to_customer",
  async task => {
    console.log("Driver driving from store to you");
    await sleep(200);
    console.log("Driver arrived");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const waitForDriverRecivedCashFromCustomerWorker = new Worker(
  "wait_for_driver_recived_cash_from_customer",
  async task => {
    console.log("Driver waiting for cash");
    await sleep(200);
    console.log("Cash accepted");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const takeMoneyFromCreditCardWorker = new Worker(
  "take_money_from_credit_card",
  async task => {
    console.log("Requesting payment from bank");
    await sleep(200);
    console.log("Payment accepted from bank");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

const takeMoneyFromAppWalletWorker = new Worker(
  "take_money_from_app_wallet",
  async task => {
    console.log("Requesting payment");
    await sleep(200);
    console.log("Payment accepted");

    return {
      status: TaskStates.Completed
    };
  },
  compensateTask,
  {
    kafkaServers,
    namespace,
    pollingCooldown: 10
  }
);

findDriverWorker.once("ready", () => console.log("findDriverWorker ready"));
sendOrderToStoreWorker.once("ready", () =>
  console.log("findDsendOrderToStoreWorkerriverWorker ready")
);
storePreparingFoodWorker.once("ready", () =>
  console.log("storePreparingFoodWorker ready")
);
driverOnTheWayToStoreWorker.once("ready", () =>
  console.log("driverOnTheWayToStoreWorker ready")
);
driverOnTheWayToCustomerWorker.once("ready", () =>
  console.log("driverOnTheWayToCustomerWorker ready")
);
waitForDriverRecivedCashFromCustomerWorker.once("ready", () =>
  console.log("waitForDriverRecivedCashFromCustomerWorker ready")
);
takeMoneyFromCreditCardWorker.once("ready", () =>
  console.log("takeMoneyFromCreditCardWorker ready")
);
takeMoneyFromAppWalletWorker.once("ready", () =>
  console.log("takeMoneyFromAppWalletWorker ready")
);
