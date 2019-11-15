// If you just exit the program.
// Please give some time before start again
// (for last consumer to be timedout)

const { Worker, Admin, taskStates } = require("@melonade/melonade-client");

const TOTAL_TRANSACTION = 1;
const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

console.log("Registering workers");

const adminClient = new Admin({
  kafkaServers,
  namespace
});

const t1Worker = new Worker(
  "t1",
  task => {
    console.log(`Processing ${task.taskName}`);
    return {
      status: taskStates.Completed,
      output: {
        message: `${task.taskName} => ${task.input.hello}`
      }
    };
  },
  task => {
    console.log(`Compensating ${task.taskName}`);
    return {
      status: taskStates.Completed
    };
  },
  {
    kafkaServers,
    namespace
  }
);

const t2Worker = new Worker(
  "t2",
  task => {
    console.log(`Processing ${task.taskName}`);
    return {
      status: taskStates.Completed,
      output: {
        message: `${task.taskName} => ${task.input.hello}`
      }
    };
  },
  task => {
    console.log(`Compensating ${task.taskName}`);
    return {
      status: taskStates.Completed
    };
  },
  {
    kafkaServers,
    namespace
  }
);

const t3Worker = new Worker(
  "t3",
  task => {
    console.log(`Processing ${task.taskName}`);
    return {
      status: taskStates.Completed,
      output: {
        message: `${task.taskName} => ${task.input.hello}`
      }
    };
  },
  task => {
    console.log(`Compensating ${task.taskName}`);
    return {
      status: taskStates.Completed
    };
  },
  {
    kafkaServers,
    namespace
  }
);

// Wait for wokers and admin client connected to kafka
setTimeout(() => {
  const startTime = new Date().toISOString();
  for (let i = 0; i < TOTAL_TRANSACTION; i++) {
    const transactionId = `${i}-${startTime}`
    console.log(`Starting transactionId: ${transactionId}`)
    adminClient.startTransaction(transactionId, {
      name: "simple",
      rev: "1"
    }, {
      hello: 'world'
    });
  }
}, 5000);
