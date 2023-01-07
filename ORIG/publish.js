const amqplib = require('amqplib');
const timers = require('timers-promises')
const exchangeName = "topic_logs";
const msg = 'MSG';
const key = 'compse140.o';
const messageCount = 0;

// Sending a message to topic compse140.o
const sendMsg = async (message) => {
    const connection = await amqplib.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', {durable: false});
    channel.publish(exchangeName, key, Buffer.from(message));
    console.log('Sent: ', message);
}

// Start operation with message count. Message count is incremented before sending a message.
const start = async (messageCount) => {
    await timers.setTimeout(5000);
    let count = messageCount;
    count++;
    await sendMsg(msg + "_" + count);
    await timers.setTimeout(3000);
    count++;
    await sendMsg(msg + "_" + count);
    await timers.setTimeout(3000);
    count++;
    await sendMsg(msg + "_" + count);
}

start(messageCount)