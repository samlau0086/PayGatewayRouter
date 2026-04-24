import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp({
  projectId: config.projectId
});
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  try {
    const snapshot = await db.collection('tenants').limit(1).get();
    console.log("Success", snapshot.size);
  } catch(e) {
    console.error("Error length:", e.message);
  }
}

test();
