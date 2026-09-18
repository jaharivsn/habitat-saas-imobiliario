/**
 * QA Smoke Test Suite - Habitat Real Estate SaaS
 * Valida integridade de dados mockados, rotas, acessibilidade e links em todo o projeto.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const stats = {
  passed: 0,
  warnings: 0,
  failed: 0,
  tests: []
};

function record(type, name, message = '') {
  stats.tests.push({ type, name, message });
  if (type === 'PASS') stats.passed++;
  if (type === 'WARN') stats.warnings++;
  if (type === 'FAIL') stats.failed++;
  
  const icon = type === 'PASS' ? '✅' : type === 'WARN' ? '⚠️' : '❌';
  console.log(`${icon} [${type}] ${name} ${message ? `-> ${message}` : ''}`);
}

console.log('\n======================================================');
console.log('🔍 INICIANDO QA SMOKE TEST SUITE (HABITAT SAAS)');
console.log('======================================================\n');

// ----------------------------------------------------
// 1. Auditoria de Estrutura de Rotas (App Router)
// ----------------------------------------------------
console.log('--- 1. AUDITORIA DE ROTAS NO APP ROUTER ---');
const appDir = path.join(srcDir, 'app');

function getAppRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        // Route group
        routes = routes.concat(getAppRoutes(path.join(dir, entry.name), baseRoute));
      } else if (entry.name.startsWith('_')) {
        // Private folder - skip
        continue;
      } else {
        const nextRoute = baseRoute ? `${baseRoute}/${entry.name}` : `/${entry.name}`;
        const pageFile = path.join(dir, entry.name, 'page.tsx');
        if (fs.existsSync(pageFile)) {
          routes.push({ route: nextRoute, file: pageFile });
        }
        routes = routes.concat(getAppRoutes(path.join(dir, entry.name), nextRoute));
      }
    }
  }
  return routes;
}

const rootPage = path.join(appDir, 'page.tsx');
const allRoutes = [];
if (fs.existsSync(rootPage)) {
  allRoutes.push({ route: '/', file: rootPage });
}
allRoutes.push(...getAppRoutes(appDir));

record('PASS', 'Contagem de Rotas do App Router', `Encontradas ${allRoutes.length} rotas ativas`);

// Verificar se cada arquivo de rota exporta um default React Component
let invalidRoutes = 0;
for (const r of allRoutes) {
  const content = fs.readFileSync(r.file, 'utf8');
  if (!content.includes('export default')) {
    record('FAIL', `Rota sem export default: ${r.route}`, r.file);
    invalidRoutes++;
  }
}
if (invalidRoutes === 0) {
  record('PASS', 'Integridade de Export Default', `100% das ${allRoutes.length} rotas possuem export default válido`);
}

// ----------------------------------------------------
// 2. Auditoria de Links Quebrados e Placeholders (href="#")
// ----------------------------------------------------
console.log('\n--- 2. AUDITORIA DE LINKS E NAVEGAÇÃO ---');

function scanFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js']) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        results = results.concat(scanFiles(fullPath, exts));
      }
    } else if (exts.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

const codeFiles = scanFiles(srcDir);
const hashLinks = [];
const emptyHrefLinks = [];

for (const file of codeFiles) {
  const relPath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf8');
  
  // Buscar href="#"
  const hashMatches = content.match(/href=["']#["']/g);
  if (hashMatches) {
    hashLinks.push({ file: relPath, count: hashMatches.length });
  }

  // Buscar href=""
  const emptyMatches = content.match(/href=["']["']/g);
  if (emptyMatches) {
    emptyHrefLinks.push({ file: relPath, count: emptyMatches.length });
  }
}

if (hashLinks.length > 0) {
  record('WARN', 'Links com placeholder href="#" detectados', `${hashLinks.length} arquivos com href="#" (${hashLinks.map(h => `${h.file} [${h.count}]`).join(', ')})`);
} else {
  record('PASS', 'Zero links com href="#"', 'Todos os links possuem destinos semânticos');
}

if (emptyHrefLinks.length > 0) {
  record('FAIL', 'Links vazios href="" detectados', `${emptyHrefLinks.length} arquivos encontrados`);
} else {
  record('PASS', 'Zero links com href="" vazio');
}

// ----------------------------------------------------
// 3. Auditoria de Acessibilidade (Tags <img> sem alt e botões sem label)
// ----------------------------------------------------
console.log('\n--- 3. AUDITORIA DE ACESSIBILIDADE & SEMÂNTICA ---');

const missingAltImgs = [];
const iconOnlyButtonsNoLabel = [];

for (const file of codeFiles) {
  const relPath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf8');

  // Checar <img> sem alt
  const imgMatches = content.match(/<img\s+[^>]*>/g);
  if (imgMatches) {
    for (const tag of imgMatches) {
      if (!tag.includes('alt=')) {
        missingAltImgs.push({ file: relPath, tag });
      }
    }
  }

  // Checar <button> com apenas ícone sem aria-label ou title
  // Heurística: botões que contêm apenas tags de Lucide (e.g. <X, <Heart, <Plus, <Minus) sem texto ou aria-label/title
  const buttonBlocks = content.match(/<button[\s\S]*?<\/button>/g);
  if (buttonBlocks) {
    for (const btn of buttonBlocks) {
      // Se não tem aria-label nem title nem texto visível evidente
      if (!btn.includes('aria-label') && !btn.includes('title=')) {
        // Se o conteúdo é só um SVG/ícone ou vazio
        const cleanContent = btn.replace(/<button[^>]*>/, '').replace(/<\/button>/, '').trim();
        if (cleanContent.startsWith('<') && cleanContent.endsWith('/>') && !cleanContent.includes('span') && !cleanContent.includes('span>')) {
          iconOnlyButtonsNoLabel.push({ file: relPath, snippet: cleanContent.slice(0, 50) });
        }
      }
    }
  }
}

if (missingAltImgs.length > 0) {
  record('WARN', 'Imagens sem atributo alt', `${missingAltImgs.length} tags encontradas em: ${[...new Set(missingAltImgs.map(m => m.file))].join(', ')}`);
} else {
  record('PASS', 'Todas as imagens possuem alt');
}

if (iconOnlyButtonsNoLabel.length > 0) {
  record('WARN', 'Botões de apenas ícone sem aria-label/title', `${iconOnlyButtonsNoLabel.length} botões detectados em: ${[...new Set(iconOnlyButtonsNoLabel.map(b => b.file))].join(', ')}`);
} else {
  record('PASS', 'Botões interativos devidamente identificados');
}

// ----------------------------------------------------
// 4. Auditoria de Tipografia e Resíduos de Serif
// ----------------------------------------------------
console.log('\n--- 4. AUDITORIA DE TIPOGRAFIA (VANILLA INTER) ---');

let fontDisplayCount = 0;
let italianaCount = 0;

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('font-display')) fontDisplayCount++;
  if (content.includes('Italiana') && !file.includes('mockData')) italianaCount++;
}

if (fontDisplayCount > 0) {
  record('FAIL', 'Resíduos de font-display detectados', `${fontDisplayCount} arquivos ainda usam font-display`);
} else {
  record('PASS', 'Zero ocorrências de font-display');
}

if (italianaCount > 0) {
  record('FAIL', 'Resíduos de fonte Italiana detectados no código', `${italianaCount} ocorrências`);
} else {
  record('PASS', 'Zero ocorrências da fonte Italiana no layout');
}

// ----------------------------------------------------
// 5. Auditoria de Mock Data (Integridade de Dados)
// ----------------------------------------------------
console.log('\n--- 5. AUDITORIA DE INTEGRIDADE DOS DADOS MOCKADOS ---');

const mockDataPath = path.join(srcDir, 'data', 'mockData.ts');
if (fs.existsSync(mockDataPath)) {
  const mockContent = fs.readFileSync(mockDataPath, 'utf8');
  
  // Extrair IDs de propriedades
  const idMatches = mockContent.match(/id:\s*["']([^"']+)["']/g) || [];
  const ids = idMatches.map(m => m.replace(/id:\s*["']/, '').replace(/["']/, ''));
  const uniqueIds = new Set(ids);
  
  if (ids.length !== uniqueIds.size) {
    record('WARN', 'IDs duplicados em mockData.ts', `Total: ${ids.length}, Únicos: ${uniqueIds.size}`);
  } else {
    record('PASS', 'Unicidade de IDs no mockData', `${uniqueIds.size} IDs únicos verificados`);
  }

  // Extrair slugs
  const slugMatches = mockContent.match(/slug:\s*["']([^"']+)["']/g) || [];
  const slugs = slugMatches.map(m => m.replace(/slug:\s*["']/, '').replace(/["']/, ''));
  const uniqueSlugs = new Set(slugs);

  if (slugs.length !== uniqueSlugs.size) {
    record('WARN', 'Slugs duplicados em mockData.ts', `Total: ${slugs.length}, Únicos: ${uniqueSlugs.size}`);
  } else {
    record('PASS', 'Unicidade de Slugs no mockData', `${uniqueSlugs.size} slugs únicos verificados`);
  }
} else {
  record('FAIL', 'Arquivo mockData.ts não encontrado', mockDataPath);
}

// ----------------------------------------------------
// Resumo do Teste
// ----------------------------------------------------
console.log('\n======================================================');
console.log('📊 RESUMO DO QA SMOKE TEST');
console.log('======================================================');
console.log(`✅ Aprovados: ${stats.passed}`);
console.log(`⚠️ Alertas (Warnings): ${stats.warnings}`);
console.log(`❌ Falhas: ${stats.failed}`);
console.log('======================================================\n');

if (stats.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
