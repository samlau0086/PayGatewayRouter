import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Data Store (In-Memory for Demo)
  // Real implementation would use PostgreSQL / MySQL
  let aSites = [
    { id: 'a1', domain: 'shoes-replica.com', name: 'Shoes VIP', api_key: 'sk_a_123' },
    { id: 'a2', domain: 'luxury-bags.com', name: 'Bags World', api_key: 'sk_a_456' },
  ];
  
  let bSites = [
    { id: 'b1', domain: 'safe-tshirts.com', name: 'T-Shirt Store (Stripe)', active: true, ratio: 1 },
    { id: 'b2', domain: 'custom-mugs.com', name: 'Mug Store (PayPal)', active: true, ratio: 1 },
  ];
  
  let orders: any[] = [];
  
  let pollingConfig = {
    rule: 'random', // 'random' or 'round-robin'
    roundRobinIndex: 0
  };
  
  // Stats APIs for Dashboard
  app.get('/api/admin/stats', (req, res) => {
    res.json({
      aSites,
      bSites,
      pollingConfig,
      orders: orders.slice().reverse().slice(0, 50), // Last 50 orders
      summary: {
        totalOrders: orders.length,
        totalRevenue: orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0),
        pending: orders.filter(o => o.status === 'pending').length
      }
    });
  });

  // Admin APIs for Configuration
  app.post('/api/admin/sites/a', (req, res) => {
    const { domain, name, api_key } = req.body;
    const newSite = { id: 'a' + Date.now(), domain, name, api_key: api_key || 'sk_a_' + crypto.randomBytes(4).toString('hex') };
    aSites.push(newSite);
    res.json({ success: true, site: newSite });
  });

  app.delete('/api/admin/sites/a/:id', (req, res) => {
    aSites = aSites.filter(s => s.id !== req.params.id);
    res.json({ success: true });
  });

  app.post('/api/admin/sites/b', (req, res) => {
    const { domain, name } = req.body;
    const newSite = { id: 'b' + Date.now(), domain, name, active: true, ratio: 1 };
    bSites.push(newSite);
    res.json({ success: true, site: newSite });
  });

  app.delete('/api/admin/sites/b/:id', (req, res) => {
    bSites = bSites.filter(s => s.id !== req.params.id);
    res.json({ success: true });
  });

  app.post('/api/admin/config/polling', (req, res) => {
    const { rule } = req.body;
    if(rule === 'random' || rule === 'round-robin') {
      pollingConfig.rule = rule;
    }
    res.json({ success: true, rule: pollingConfig.rule });
  });

  // Toggle B Site Status
  app.post('/api/admin/sites/b/:id/toggle', (req, res) => {
    const site = bSites.find(s => s.id === req.params.id);
    if(site) {
      site.active = !site.active;
      res.json({ success: true, site });
    } else {
      res.json({ success: false, error: 'Site not found' });
    }
  });

  // Mock Request from A Site Plugin (WooCommerce / Custom)
  app.post('/api/gateway/checkout', (req, res) => {
    const { api_key, order_id, amount, currency, items } = req.body;
    
    // 1. Verify A Site
    const aSite = aSites.find(s => s.api_key === api_key);
    if (!aSite) {
      return res.status(401).json({ error: 'Unauthorized A Site API Key' });
    }
    
    // 2. Load Balancing / AB Polling Logic (Round Robin or Weighted)
    const activeBSites = bSites.filter(s => s.active);
    if (activeBSites.length === 0) {
      return res.status(500).json({ error: 'No active B Sites available for routing.' });
    }
    
    // Check Polling Rule
    let bSite;
    if (pollingConfig.rule === 'round-robin') {
      bSite = activeBSites[pollingConfig.roundRobinIndex % activeBSites.length];
      pollingConfig.roundRobinIndex++;
    } else {
      // Default to Random
      bSite = activeBSites[Math.floor(Math.random() * activeBSites.length)];
    }
    
    // 3. Create System Order
    const sysOrderId = 'sys_' + crypto.randomBytes(6).toString('hex');
    const bSiteOrderId = 'ext_' + crypto.randomBytes(4).toString('hex');
    
    const newOrder = {
      sysOrderId,
      aSiteId: aSite.id,
      aSiteOrderId: order_id,
      bSiteId: bSite.id,
      bSiteOrderId,
      amount,
      currency,
      status: 'pending',
      syncToAStatus: 'pending',
      syncToBStatus: 'pending',
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    
    // 4. Return B Site Payment URL back to A Site
    // The A site will redirect the user to this safe URL for payment completion
    const paymentUrl = `https://${bSite.domain}/secure-checkout?ref=${sysOrderId}`;
    res.json({
      success: true,
      paymentUrl,
      sysOrderId
    });
  });

  // Mock Webhook from Payment Gateway hitting B Site
  app.post('/api/webhook/gateway', (req, res) => {
    // In reality this arrives at B Site domain, and B Site forwards to this core API
    const { sysOrderId, status } = req.body; 
    
    const order = orders.find(o => o.sysOrderId === sysOrderId);
    if(order) {
      order.status = status; // e.g. 'paid', 'failed'
      order.syncToAStatus = 'syncing';
      
      // Simulate real-world network delay for A-Site Webhook
      setTimeout(() => {
         order.syncToAStatus = 'synced';
      }, 1500);
      
      res.json({ success: true, updated: true });
    } else {
      res.json({ success: false, error: 'Order not found' });
    }
  });

  // Mock Webhook from A Site (e.g. Order Cancelled or Refunded by admin on WooCommerce)
  app.post('/api/webhook/origin', (req, res) => {
    // In reality this arrives at the Router from A Site
    const { sysOrderId, status, source } = req.body; 
    
    // Prevent infinite loop
    if (source === 'router_sync') {
      return res.json({ success: true, ignored: 'Prevented loop' });
    }

    const order = orders.find(o => o.sysOrderId === sysOrderId);
    if(order) {
      if (order.status === status) {
        return res.json({ success: true, ignored: 'Status already matches' });
      }

      order.status = status; // e.g. 'refunded', 'cancelled'
      order.syncToBStatus = 'syncing';
      
      // Simulate real-world network delay for B-Site Webhook (e.g. API call to cancel Stripe payment)
      setTimeout(() => {
         order.syncToBStatus = 'synced';
      }, 1500);
      
      res.json({ success: true, updated: true });
    } else {
      res.json({ success: false, error: 'Order not found' });
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
