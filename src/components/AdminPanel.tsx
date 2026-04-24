import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, ArrowLeft, MoreVertical, Calendar, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AdminPanel({ onBack }: { onBack: () => void }) {
  const [tenants, setTenants] = useState<any[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [newDays, setNewDays] = useState('7');

  useEffect(() => {
    let active = true;
    const fetchIt = async () => {
      try {
        const data = await apiFetch('/admin/tenants');
        if (active) setTenants(data);
      } catch (e: any) { 
        console.error(e); 
        if (e.message.includes('Unauthorized') || e.message.includes('Tenant')) {
          window.location.reload(); // Quickest way to reset app state from deep child
        }
      }
    };
    fetchIt();
    const int = setInterval(fetchIt, 3000);
    return () => { active = false; clearInterval(int); };
  }, []);

  const updateExpiry = async (id: string, days: number) => {
    const tenant = tenants.find(t => t.id === id);
    const currentExpiry = tenant?.expiresAt ? new Date(tenant.expiresAt).getTime() : Date.now();
    const newExpiry = new Date(currentExpiry + days * 24 * 60 * 60 * 1000).toISOString();
    await apiFetch(`/tenants/${id}`, { method: 'PUT', body: JSON.stringify({ expiresAt: newExpiry, active: true }) });
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await apiFetch(`/tenants/${id}`, { method: 'PUT', body: JSON.stringify({ active: !currentStatus }) });
  };

  const addTenant = async () => {
    if (!newEmail) return;
    const expiresAt = new Date(Date.now() + parseInt(newDays) * 24 * 60 * 60 * 1000).toISOString();
    await apiFetch('/admin/tenants', {
       method: 'POST',
       body: JSON.stringify({
         email: newEmail,
         strategy: 'random',
         roundRobinIndex: 0,
         apiKey: 'sk_test_' + Math.random().toString(36).substring(2, 10),
         active: true,
         expiresAt
       })
    });
    setNewEmail('');
  };

  const deleteTenant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tenant and all their sites?')) return;
    await apiFetch(`/admin/tenants/${id}`, { method: 'DELETE' });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans">
      <header className="bg-white border-b-2 border-[#141414] p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
           <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 hover:bg-[#141414] hover:text-white rounded-none">
             <ArrowLeft className="w-5 h-5" />
           </Button>
           <div className="bg-[#141414] text-white w-8 h-8 flex items-center justify-center mr-3 rounded-sm">
             <ShieldCheck className="w-5 h-5" />
           </div>
           <div>
             <h1 className="text-xl font-black uppercase tracking-tighter text-[#141414]">SaaS Admin</h1>
             <div className="text-[10px] uppercase font-mono text-slate-500 font-bold tracking-widest">Superuser Dashboard</div>
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
         
         <div className="bg-white border-2 border-[#141414] shadow-[4px_4px_0_0_#141414] p-6 mb-6">
            <h2 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center">
               <Plus className="w-5 h-5 mr-2" /> Add New Tenant
            </h2>
            <div className="flex gap-4 items-end">
               <div className="flex-1">
                 <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Email / Identifier</label>
                 <Input 
                   value={newEmail} 
                   onChange={e => setNewEmail(e.target.value)} 
                   placeholder="user@example.com"
                   className="rounded-none border-2 border-[#141414]"
                 />
               </div>
               <div>
                 <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Initial Trial</label>
                 <Select value={newDays} onValueChange={setNewDays}>
                    <SelectTrigger className="w-[150px] rounded-none border-2 border-[#141414]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-2 border-[#141414]">
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <Button onClick={addTenant} className="bg-[#141414] hover:bg-black text-white rounded-none uppercase font-bold tracking-widest h-10 px-8">
                  Create Tenant
               </Button>
            </div>
         </div>

         <div className="bg-white border-2 border-[#141414] shadow-[4px_4px_0_0_#141414] p-6">
            <h2 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center">
               <Calendar className="w-5 h-5 mr-2" /> Tenant Management
            </h2>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm font-mono">
                 <thead className="bg-[#141414] text-white">
                   <tr>
                     <th className="p-3 font-bold uppercase tracking-wider">Tenant / Email</th>
                     <th className="p-3 font-bold uppercase tracking-wider">Status</th>
                     <th className="p-3 font-bold uppercase tracking-wider">Expiry Date</th>
                     <th className="p-3 font-bold uppercase tracking-wider text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#141414]">
                    {tenants.map(tenant => {
                       const isExpired = tenant.expiresAt && new Date(tenant.expiresAt).getTime() < Date.now();
                       const statusStr = tenant.active ? (isExpired ? 'EXPIRED' : 'ACTIVE') : 'DISABLED';
                       
                       return (
                         <tr key={tenant.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="p-3">
                             <div className="font-bold text-[14px] font-sans">{tenant.email}</div>
                             <div className="text-[10px] text-slate-500 mt-1">ID: {tenant.id}</div>
                           </td>
                           <td className="p-3">
                              <span className={`px-2 py-1 text-[10px] uppercase font-bold ${statusStr === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                {statusStr}
                              </span>
                           </td>
                           <td className="p-3 text-xs">
                              {tenant.expiresAt ? new Date(tenant.expiresAt).toLocaleDateString() + ' ' + new Date(tenant.expiresAt).toLocaleTimeString() : 'No expiry set'}
                           </td>
                           <td className="p-3 flex gap-2 justify-end">
                              <Select onValueChange={(val: string) => updateExpiry(tenant.id, parseInt(val))}>
                                <SelectTrigger className="w-[110px] h-8 text-[10px] rounded-none border-[#141414] uppercase font-bold">
                                  <SelectValue placeholder="Add Time" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none border-2 border-[#141414]">
                                  <SelectItem value="7">+7 Days</SelectItem>
                                  <SelectItem value="30">+30 Days</SelectItem>
                                  <SelectItem value="365">+1 Year</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 rounded-none border-[#141414] text-[10px] uppercase font-bold w-[70px]"
                                onClick={() => toggleStatus(tenant.id, !!tenant.active)}
                              >
                                {tenant.active ? 'Disable' : 'Enable'}
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="icon" 
                                className="h-8 w-8 rounded-none"
                                onClick={() => deleteTenant(tenant.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                           </td>
                         </tr>
                       );
                    })}
                 </tbody>
               </table>
            </div>
         </div>
      </main>
    </div>
  );
}
