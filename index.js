// Import required modules
const express = require('express'); // Express is used for building the API.
const amqp = require('amqplib/callback_api'); // AMQP client to connect with RabbitMQ.
const cors = require('cors'); // Enable CORS for cross-origin requests.
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse incoming JSON bodies.
app.use(cors()); // Enable CORS for all routes.

let orders = []; // Store orders fetched from the RabbitMQ queue.

// URL for connecting to RabbitMQ (localhost for local development)
const RABBITMQ_CONNECTION_STRING = process.env.RABBITMQ_CONNECTION_STRING || 'amqp://localhost';
const queue = 'order_queue'; // Queue name for orders.

// Connect to RabbitMQ and consume messages
amqp.connect(RABBITMQ_CONNECTION_STRING, (err, conn) => {
  if (err) {
    console.error('Error connecting to RabbitMQ', err);
    return;
  }

  conn.createChannel((err, channel) => {
    if (err) {
      console.error('Error creating channel', err);
      return;
    }

    // Assert the queue exists
    channel.assertQueue(queue, { durable: false });

    // Consume messages from the queue
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString()); // Parse the order message
        orders.push(order); // Store the order in the orders array
        console.log('Received order:', order);
        channel.ack(msg); // Acknowledge the message
      }
    }, { noAck: false });
  });
});

// Expose an API endpoint to retrieve the orders
app.get('/orders', (req, res) => {
  res.json(orders); // Return the stored orders
});

// Start the server
const PORT = process.env.PORT || 4000; // Use a different port for management-service
app.listen(PORT, () => {
  console.log(`Management service is running on http://localhost:${PORT}`);
});
