import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Client SDK for Backend (since admin SDK lacks SA credentials in sandbox)
const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Note: Admin / Stats APIs are now handled pure-client side in React using Firebase Client SDK!
  // We only keep the public-facing Gateway APIs and Webhooks here.

  // Mock Request from A Site Plugin (WooCommerce / Custom)
  app.post('/api/gateway/checkout', async (req, res) => {
    try {
      const { api_key, order_id, amount, currency, items } = req.body;
      
      // 1. Verify A Site via API Key
      const aSiteQ = query(collection(db, 'aSites'), where('api_key', '==', api_key));
      const aSiteSnapshot = await getDocs(aSiteQ);
      if (aSiteSnapshot.empty) {
        return res.status(401).json({ error: 'Unauthorized A Site API Key' });
      }
      const aSiteDoc = aSiteSnapshot.docs[0];
      const aSiteId = aSiteDoc.id;
      const tenantId = aSiteDoc.data().tenantId;

      // Fetch Tenant
      const tenantRef = doc(db, 'tenants', tenantId);
      const tenantDoc = await getDoc(tenantRef);
      if (!tenantDoc.exists()) {
        return res.status(401).json({ error: 'Invalid tenant configuration' });
      }
      const tenant = tenantDoc.data();

      // 2. Load Balancing / AB Polling Logic (Round Robin or Weighted)
      const bSiteQ = query(collection(db, 'bSites'), where('tenantId', '==', tenantId));
      const bSiteSnapshot = await getDocs(bSiteQ);
      if (bSiteSnapshot.empty) {
        return res.status(500).json({ error: 'No active B Sites available for routing.' });
      }
      const activeBSites = bSiteSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Check Polling Rule
      let bSite;
      if (tenant.strategy === 'round_robin') {
        let index = tenant.roundRobinIndex || 0;
        bSite = activeBSites[index % activeBSites.length];
        await updateDoc(tenantRef, { roundRobinIndex: index + 1 });
      } else {
        // Default to Random
        bSite = activeBSites[Math.floor(Math.random() * activeBSites.length)];
      }
      
      // 3. Create System Order
      const sysOrderId = 'sys_' + crypto.randomBytes(6).toString('hex');
      const bSiteOrderId = 'ext_' + crypto.randomBytes(4).toString('hex');
      
      const newOrder = {
        tenantId,
        sysOrderId,
        aSiteId: aSiteId,
        aSiteOrderId: String(order_id),
        bSiteId: bSite.id,
        bSiteOrderId,
        amount: Number(amount),
        currency: currency || 'USD',
        status: 'pending',
        syncToAStatus: 'pending',
        syncToBStatus: 'pending',
        createdAt: new Date().toISOString()
      };
      
      const orderRef = doc(db, 'orders', sysOrderId);
      await setDoc(orderRef, newOrder);
      
      // 4. Return B Site Payment URL back to A Site
      const paymentUrl = `https://${bSite.domain}/secure-checkout?ref=${sysOrderId}`;
      res.json({
        success: true,
        paymentUrl,
        sysOrderId
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Mock Webhook from Payment Gateway hitting B Site
  app.post('/api/webhook/gateway', async (req, res) => {
    try {
      const { sysOrderId, status } = req.body; 
      
      const orderRef = doc(db, 'orders', sysOrderId);
      const orderDoc = await getDoc(orderRef);
      
      if(orderDoc.exists()) {
        await updateDoc(orderRef, {
          status: status,
          syncToAStatus: 'syncing'
        });
        
        // Simulate real-world network delay for A-Site Webhook
        setTimeout(async () => {
           await updateDoc(orderRef, { syncToAStatus: 'synced' });
        }, 1500);
        
        res.json({ success: true, updated: true });
      } else {
        res.json({ success: false, error: 'Order not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Mock Webhook from A Site (e.g. Order Cancelled or Refunded by admin on WooCommerce)
  app.post('/api/webhook/origin', async (req, res) => {
    try {
      const { sysOrderId, status, source } = req.body; 
      
      if (source === 'router_sync') {
        return res.json({ success: true, ignored: 'Prevented loop' });
      }

      const orderRef = doc(db, 'orders', sysOrderId);
      const orderDoc = await getDoc(orderRef);
      
      if(orderDoc.exists()) {
        const order = orderDoc.data();
        if (order?.status === status) {
          return res.json({ success: true, ignored: 'Status already matches' });
        }

        await updateDoc(orderRef, {
          status: status,
          syncToBStatus: 'syncing'
        });
        
        // Simulate asynchronous push to B-Site 
        setTimeout(async () => {
           await updateDoc(orderRef, { syncToBStatus: 'synced' });
        }, 1500);
        
        res.json({ success: true, updated: true });
      } else {
        res.json({ success: false, error: 'Order not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
