const kafka = require("../client/client");
const Register = require("../module/student");
const connectDB = require("../db/conn");

async function initConsumer() {
  const consumer = kafka.consumer({ groupId: "user-group-1" });

  try {
    console.log("🔄 Connecting Kafka Consumer...");
    await consumer.connect();
    console.log("✅ Consumer connected successfully");

    // subscribe to the same topic your producer is sending to:
    await consumer.subscribe({ topic: "UserUpdateApi", fromBeginning: true });
    console.log("✅ Subscribed to topic 'UserUpdateApi'");

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const { email, password } = JSON.parse(message.value.toString());
          console.log(`📥 Received update for ${email}`);

          // Use updateOne to get a result.modifiedCount:
          const result = await Register.updateOne(
            { email },
            { password }
          );

          if (result.modifiedCount > 0) {
            console.log(`✅ Updated password for: ${email}`);
          } else {
            console.warn(`⚠️ No user found with email: ${email}`);
          }
        } catch (err) {
          console.error("❌ Error processing message:", err);
        }
      },
    });
  } catch (err) {
    console.error("❌ Kafka Consumer Error:", err);
  }
}

(async () => {
  await connectDB();
  await initConsumer();
})();
