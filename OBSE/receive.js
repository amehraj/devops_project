const amqplib = require('amqplib');
const exchangeName = "topic_logs";
const timers = require('timers-promises')
const key1 = 'compse140.o';
const key2 = 'compse140.i';
const fs = require('fs');

// Receive messages from both compse140.o and compse140.i
const recieveMsg = async () => {
    //empty the existing file
    fs.truncate('./public/file.txt', 0, err => {
      if (err) {
        console.error(err);
      }
    });
    let messageCount = 0;
    const connection = await amqplib.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', {durable: false});
    const q = await channel.assertQueue('', {exclusive: true});
    console.log(`Waiting for messages in queue: ${q.queue}`);
    channel.bindQueue(q.queue, exchangeName, key1);
    channel.bindQueue(q.queue, exchangeName, key2);
    channel.consume(q.queue, msg => {
      if(msg.content) {
          ++messageCount;
          console.log(`Routing Key: ${msg.fields.routingKey}, Message: ${msg.content.toString()}`);
          const date = new Date(Date.now());
          const timestamp = date.toISOString();
          const topic = msg.fields.routingKey;
          const messageBody = msg.content.toString();
          const newMessage = timestamp + " " + messageCount + " " + messageBody + " to " + topic + "\r\n";

          //Write message details to file
          fs.appendFile('./public/file.txt', newMessage, err => {
            if (err) {
              console.error(err);
            }
          });
      }
    }, {noAck: true})
  }
  
  recieveMsg();