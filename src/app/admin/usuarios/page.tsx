import { mockBrokers, mockClients } from "@/data/mockData";

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Base de Contas
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Gestão de Usuários da Plataforma
        </h1>
      </div>

      <div className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1420] border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 pl-6">Usuário</th>
                <th className="p-4">Tipo de Acesso</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockBrokers.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 pl-6 font-bold text-white">{b.name}</td>
                  <td className="p-4 text-gold-400 font-semibold">Corretor Credenciado</td>
                  <td className="p-4 text-slate-400 font-mono text-[11px]">{b.email}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[9px] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                      Ativo
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition">
                      Gerenciar
                    </button>
                  </td>
                </tr>
              ))}
              {mockClients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 pl-6 font-bold text-white">{c.name}</td>
                  <td className="p-4 text-gold-300 font-semibold">Comprador VIP</td>
                  <td className="p-4 text-slate-400 font-mono text-[11px]">{c.email}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[9px] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                      Ativo
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition">
                      Gerenciar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
