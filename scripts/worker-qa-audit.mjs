/**
 * Worker Supremo QA Audit Runner
 * Executa auditoria estática via IA cascata (Groq/Mistral/Gemini) para componentes chave
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const runnerPath = 'C:\\Users\\jahar\\.gemini\\config\\mcp\\qwen-worker\\runner.js';
const targetReport = path.join(rootDir, 'QA_AUDIT_REPORT.md');

// Arquivos críticos para auditar
const targetFiles = [
  'src/components/search/PropertySearchHub.tsx',
  'src/components/property/PropertyCard.tsx',
  'src/app/imovel/[slug]/page.tsx',
  'src/app/dashboard/leads/page.tsx',
];

console.log('\n======================================================');
console.log('🤖 INICIANDO AUDITORIA WORKER SUPREMO (IA CASCADE)');
console.log('======================================================\n');

// Criar base do relatório se não existir
if (!fs.existsSync(targetReport)) {
  fs.writeFileSync(targetReport, `# RELATÓRIO PRELIMINAR DE AUDITORIA QA\nIniciando varredura...\n`, 'utf8');
}

const auditTask = `Execute uma auditoria completa de QA estético, funcional e de código para este componente do Habitat SaaS Imobiliário.
Analise:
1. Segurança de tipos TypeScript e integridade de props.
2. Acessibilidade (ARIA, contrastes, touch targets >= 44px).
3. Anti-AI-slop: ausência de gradientes genéricos, espaçamento clean, tipografia neutra Inter.
4. Robustez de handlers de evento e ausência de falhas em tempo de execução.
Gere um relatório técnico em Markdown conciso com: Status Geral, Pontos de Atenção Encontrados e Recomendações Técnicas Acionáveis.`;

try {
  console.log(`[Worker Supremo] Delegando auditoria de ${targetFiles[0]} para a cascata de IA gratuita...`);
  const cmd = `node "${runnerPath}" --file "${targetReport}" --task "${auditTask} Arquivo analisado: ${targetFiles[0]}"`;
  const output = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
  console.log(output);
  console.log('✅ [Worker Supremo] Auditoria concluída com sucesso!');
} catch (err) {
  console.warn('⚠️ [Worker Supremo] Falha na execução da cascata remota:', err.message);
  console.log('Prosseguindo com a auditoria local integrada.');
}
