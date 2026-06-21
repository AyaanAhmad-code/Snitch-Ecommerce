import dotenv from "dotenv";
dotenv.config();
import sendEmail from "./src/utils/sendEmail.js";

async function test() {
  try {
    await sendEmail({
      email: "ayaanopyt06@gmail.com",
      subject: "Test",
      html: "<p>Test</p>"
    });
    console.log("SUCCESS!");
  } catch(e) {
    console.error("ERROR:");
    console.error(e);
  }
}
test();
