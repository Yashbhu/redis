const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (error) =>
  console.log("Redis client error occurred!", error)
);

async function testAdditionalFeatures() {
  try {
    await client.connect();

    // Create a subscriber from the main client
    const subscriber = client.duplicate(); // creates a new Redis connection
    await subscriber.connect();

    // Subscribe to the channel
    await subscriber.subscribe("dummy-channel", (message, channel) => {
      console.log(`Received from ${channel}: ${message}`);
    });

    // Publish messages
    await client.publish("dummy-channel", "First message from publisher");
    await client.publish("dummy-channel", "Second message from publisher");

    // Wait for messages to be received
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Clean up
    await subscriber.unsubscribe("dummy-channel");
    await subscriber.quit();
    await client.quit();

//pipleining and transcation  
//pip.. sending mutliptle commands in redis server in a batch dont want to wait fo reach other replu
//trnascation alklowing mutlple commands toi send in a unit
//transcation success of both should be thier


       const multi = client.multi();

        multi.set("key-transaction1", "value1");
         multi.set("key-transaction2", "value2");
       multi.get("key-transaction1");
       multi.get("key-transaction2");

         const results = await multi.exec();
       console.log(results);

       const pipeline = client.multi();
        multi.set("key-pipeline1", "value1");
         multi.set("key-pipeline2", "value2");
         multi.get("key-pipeline1");
        multi.get("key-pipeline2");











    console.log("✅ Finished pub-sub demo.");
  } catch (error) {
    console.error("❌ Error occurred:", error);
  }
}

testAdditionalFeatures();
