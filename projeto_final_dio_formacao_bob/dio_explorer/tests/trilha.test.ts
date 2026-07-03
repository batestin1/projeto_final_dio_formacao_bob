import { executarComandoTrilha } from '../commands/trilha';

// Contador de testes
let testsPassed = 0;
let testsFailed = 0;
const failedTests: string[] = [];

// Helper para assertions
function assert(condition: boolean, message: string, testName: string) {
  if (!condition) {
    testsFailed++;
    failedTests.push(`${testName}: ${message}`);
    console.log(`  ❌ ${testName}`);
    console.log(`     Falha: ${message}`);
  } else {
    testsPassed++;
    console.log(`  ✅ ${testName}`);
  }
}

function assertContains(actual: string, expected: string, testName: string) {
  assert(
    actual.includes(expected),
    `Esperado que contenha "${expected}"`,
    testName
  );
}

console.log('\n📦 Testes do Comando /trilha\n');

// Teste 1: Deve retornar trilhas de Java
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Formação Java Developer', 'Deve retornar trilhas de Java');
  assertContains(resultado, 'Java', 'Deve conter tecnologia Java');
  assertContains(resultado, 'Intermediário', 'Deve conter nível');
  assertContains(resultado, 'Spring Framework', 'Deve conter Spring Framework');
  assertContains(resultado, 'Microservices', 'Deve conter Microservices');
})();

// Teste 2: Deve retornar trilhas de Python
(() => {
  const resultado = executarComandoTrilha('Python');
  assertContains(resultado, 'Python', 'Deve retornar trilhas de Python');
  assertContains(resultado, 'trilha(s) encontrada(s)', 'Deve indicar trilhas encontradas');
  assertContains(resultado, 'XP Total', 'Deve conter XP Total');
})();

// Teste 3: Deve retornar trilhas de JavaScript
(() => {
  const resultado = executarComandoTrilha('JavaScript');
  assertContains(resultado, 'JavaScript', 'Deve retornar trilhas de JavaScript');
  assertContains(resultado, 'Full Stack', 'Deve conter Full Stack');
  assertContains(resultado, 'React', 'Deve conter React');
  assertContains(resultado, 'Node.js', 'Deve conter Node.js');
})();

// Teste 4: Deve retornar trilhas de React
(() => {
  const resultado = executarComandoTrilha('React');
  assertContains(resultado, 'React', 'Deve retornar trilhas de React');
  assertContains(resultado, 'Redux', 'Deve conter Redux');
  assertContains(resultado, 'Next.js', 'Deve conter Next.js');
})();

// Teste 5: Deve retornar erro para tecnologia inexistente
(() => {
  const resultado = executarComandoTrilha('TecnologiaInexistente123');
  assertContains(resultado, '❌', 'Deve retornar erro para tecnologia inexistente');
  assertContains(resultado, 'Nenhuma trilha encontrada', 'Deve indicar que não encontrou');
  assertContains(resultado, 'Tecnologias disponíveis', 'Deve listar tecnologias disponíveis');
})();

// Teste 6: Deve buscar trilhas case-insensitive
(() => {
  const resultadoLower = executarComandoTrilha('java');
  const resultadoUpper = executarComandoTrilha('JAVA');
  const resultadoMixed = executarComandoTrilha('JaVa');
  
  assertContains(resultadoLower, 'Java', 'Deve buscar com lowercase');
  assertContains(resultadoUpper, 'Java', 'Deve buscar com uppercase');
  assertContains(resultadoMixed, 'Java', 'Deve buscar com mixed case');
})();

// Teste 7: Deve incluir informações de badges
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Badges Disponíveis', 'Deve incluir seção de badges');
  assertContains(resultado, '🎖️', 'Deve incluir ícone de badge');
})();

// Teste 8: Deve incluir informações de lives
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Lives ao Vivo', 'Deve incluir seção de lives');
  assertContains(resultado, '📺', 'Deve incluir ícone de live');
})();

// Teste 9: Deve incluir plano de estudos sugerido
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Plano de Estudos Sugerido', 'Deve incluir plano de estudos');
  assertContains(resultado, 'Fase 1: Fundamentos', 'Deve incluir Fase 1');
  assertContains(resultado, 'Fase 2: Intermediário', 'Deve incluir Fase 2');
  assertContains(resultado, 'Fase 3: Avançado', 'Deve incluir Fase 3');
})();

// Teste 10: Deve incluir próximos passos
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Próximos Passos', 'Deve incluir próximos passos');
  assertContains(resultado, '/desafio', 'Deve mencionar comando /desafio');
  assertContains(resultado, '/certificado', 'Deve mencionar comando /certificado');
})();

// Teste 11: Deve retornar múltiplas trilhas quando aplicável
(() => {
  const resultado = executarComandoTrilha('Python');
  const numeroTrilhas = (resultado.match(/##\s+\d+\./g) || []).length;
  assert(
    numeroTrilhas > 0,
    `Esperado mais de 0 trilhas, encontrado ${numeroTrilhas}`,
    'Deve retornar múltiplas trilhas de Python'
  );
})();

// Teste 12: Deve formatar XP com separador de milhares
(() => {
  const resultado = executarComandoTrilha('Java');
  const temFormatacao = /\d{1,3}(\.\d{3})*\s+pontos/.test(resultado);
  assert(
    temFormatacao,
    'XP deve estar formatado com separador de milhares',
    'Deve formatar XP corretamente'
  );
})();

// Teste 13: Deve indicar acesso vitalício
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Acesso Vitalício', 'Deve indicar acesso vitalício');
  assertContains(resultado, '✅ Sim', 'Deve confirmar acesso vitalício');
})();

// Teste 14: Deve buscar por nome da trilha
(() => {
  const resultado = executarComandoTrilha('DevOps');
  assertContains(resultado, 'DevOps', 'Deve buscar por nome DevOps');
  assertContains(resultado, 'Docker', 'Deve conter Docker');
  assertContains(resultado, 'Kubernetes', 'Deve conter Kubernetes');
})();

// Teste 15: Deve incluir informações de módulos
(() => {
  const resultado = executarComandoTrilha('Java');
  assertContains(resultado, 'Módulos:', 'Deve incluir número de módulos');
})();

// Resumo dos testes
console.log('\n' + '='.repeat(50));
console.log(`\n📊 Resumo dos Testes:`);
console.log(`   ✅ Passou: ${testsPassed}`);
console.log(`   ❌ Falhou: ${testsFailed}`);
console.log(`   📈 Total: ${testsPassed + testsFailed}`);
console.log(`   🎯 Taxa de Sucesso: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(2)}%`);

if (failedTests.length > 0) {
  console.log(`\n❌ Testes que falharam:`);
  failedTests.forEach(test => console.log(`   - ${test}`));
}

console.log('\n' + '='.repeat(50) + '\n');

// Exportar resultados
export const testResults = {
  passed: testsPassed,
  failed: testsFailed,
  total: testsPassed + testsFailed,
  successRate: (testsPassed / (testsPassed + testsFailed)) * 100,
  failedTests
};

// Made with Bob
