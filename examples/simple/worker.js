const { Worker, taskStates } = require("@melonade/melonade-client");

const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

console.log("Registering workers");

const t1Worker = new Worker(
  "t1",
  task => {
    console.log(`Processing ${task.taskName}`);
    return {
      status: taskStates.Completed,
      output: {
        hello: `${task.input.hello} => ${task.taskName}`
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
        hello: `${task.input.hello} => ${task.taskName}`
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
        hello: `${task.input.hello} => ${task.taskName}`
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
