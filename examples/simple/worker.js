const { Worker, TaskStates } = require("@melonade/melonade-client");

const kafkaServers = "localhost:29092";
const namespace = "docker-compose";

console.log("Registering workers");

const t1Worker = new Worker(
  "t1",
  task => {
    console.log(`Processing ${task.taskName}`);
    return {
      status: TaskStates.Completed,
      output: {
        hello: `${task.input.hello} => ${task.taskName}`
      }
    };
  },
  task => {
    console.log(`Compensating ${task.taskName}`);
    return {
      status: TaskStates.Completed
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
      status: TaskStates.Completed,
      output: {
        hello: `${task.input.hello} => ${task.taskName}`
      }
    };
  },
  task => {
    console.log(`Compensating ${task.taskName}`);
    return {
      status: TaskStates.Completed
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
      status: TaskStates.Failed,
      output: {
        hello: `${task.input.hello} => ${task.taskName}`
      }
    };
  },
  task => {
    console.log(`Compensating ${task.taskName}`);
    return {
      status: TaskStates.Completed
    };
  },
  {
    kafkaServers,
    namespace
  }
);


t1Worker.once('ready', () => console.log('t1Worker ready'))
t2Worker.once('ready', () => console.log('t2Worker ready'))
t3Worker.once('ready', () => console.log('t3Worker ready'))
