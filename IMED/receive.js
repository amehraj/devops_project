const amqplib = require('amqplib');
const timers = require('timers-promises')
const exchangeName = "topic_logs";
const key = 'compse140.o';


// Receive message from topic compse140.o
const recieveMsg = async () => {
  const connection = await amqplib.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', {durable: false});
  const q = await channel.assertQueue('', {exclusive: true});
  console.log(`Waiting for messages in queue: ${q.queue}`);
  channel.bindQueue(q.queue, exchangeName, key);
  await timers.setTimeout(1000);
  channel.consume(q.queue, msg => {
    if(msg.content) {
        console.log(`Routing Key: ${msg.fields.routingKey}, Message: ${msg.content.toString()}`);
        const newMessage = "Got " +  msg.content.toString();
        //Sending message to topic compse140.i
        channel.publish(exchangeName, 'compse140.i', Buffer.from(newMessage));
        console.log('Sent: ', newMessage);
    }
  }, {noAck: true})
}

recieveMsg();