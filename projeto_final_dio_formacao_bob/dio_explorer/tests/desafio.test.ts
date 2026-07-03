import { executarComandoDesafio } from '../commands/desafio';

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

console.log('\n📦 Testes do Comando /desafio\n');

// Teste 1: Deve gerar desafio de Java
(() => {
  const resultado = executarComandoDesafio('Java', 'Básico');
  assertContains(resultado, 'Desafio de Código', 'Deve gerar desafio de Java');
  assertContains(resultado, 'Java', 'Deve conter tecnologia Java');
  assertContains(resultado, 'Básico', 'Deve conter nível Básico');
})();

// Teste 2: Deve gerar desafio de Python
(() => {
  const resultado = executarComandoDesafio('Python', 'Intermediário');
  assertContains(resultado, 'Python', 'Deve gerar desafio de Python');
  assertContains(resultado, 'Intermediário', 'Deve conter nível Intermediário');
})();

// Teste 3: Deve gerar desafio de JavaScript
(() => {
  const resultado = executarComandoDesafio('JavaScript', 'Avançado');
  assertContains(resultado, 'JavaScript', 'Deve gerar desafio de JavaScript');
  assertContains(resultado, 'Avançado', 'Deve conter nível Avançado');
})();

// Teste 4: Deve gerar desafio de React
(() => {
  const resultado = executarComandoDesafio('React', 'Básico');
  assertContains(resultado, 'React', 'Deve gerar desafio de React');
  assertContains(resultado, 'Pontos:', 'Deve conter pontos XP');
})();

// Teste 5: Deve retornar erro para tecnologia inexistente
(() => {
  const resultado = executarComandoDesafio('TecnologiaInexistente123', 'Básico');
  assertContains(resultado, '❌', 'Deve retornar erro');
  assertContains(resultado, 'Tecnologia não encontrada', 'Deve indicar tecnologia não encontrada');
})();

// Teste 6: Deve incluir descrição do desafio
(() => {
  const resultado = executarComandoDesafio('Java', 'Básico');
  assertContains(resultado, 'Descrição', 'Deve incluir descrição');
})();

// Teste 7: Deve incluir requisitos
(() => {
  const resultado = executarComandoDesafio('Python', 'Básico');
  assertContains(resultado, 'Requisitos', 'Deve incluir requisitos');
})();

// Teste 8: Deve incluir dicas
(() => {
  const resultado = executarComandoDesafio('JavaScript', 'Intermediário');
  assertContains(resultado, 'Dicas', 'Deve incluir dicas');
  assertContains(resultado, '💡', 'Deve incluir ícone de dica');
})();

// Teste 9: Deve incluir exemplos
(() => {
  const resultado = executarComandoDesafio('Java', 'Básico');
  assertContains(resultado, 'Exemplos', 'Deve incluir exemplos');
  assertContains(resultado, 'Entrada:', 'Deve incluir entrada de exemplo');
  assertContains(resultado, 'Saída:', 'Deve incluir saída de exemplo');
})();

// Teste 10: Deve incluir recompensas
(() => {
  const resultado = executarComandoDesafio('Python', 'Intermediário');
  assertContains(resultado, 'Recompensas', 'Deve incluir recompensas');
  assertContains(resultado, 'XP', 'Deve mencionar XP');
  assertContains(resultado, 'Badge', 'Deve mencionar badge');
})();

// Teste 11: Deve incluir próximos passos
(() => {
  const resultado = executarComandoDesafio('React', 'Avançado');
  assertContains(resultado, 'Próximos Passos', 'Deve incluir próximos passos');
})();

// Teste 12: Deve funcionar sem especificar nível
(() => {
  const resultado = executarComandoDesafio('Java', 'todos');
  assertContains(resultado, 'Java', 'Deve funcionar sem nível específico');
  assertContains(resultado, 'Desafio de Código', 'Deve gerar desafio');
})();

// Teste 13: Deve gerar desafio genérico para tecnologias sem desafios específicos
(() => {
  const resultado = executarComandoDesafio('Azure', 'Básico');
  assertContains(resultado, 'Azure', 'Deve gerar desafio genérico para Azure');
  assertContains(resultado, 'Projeto Prático', 'Deve ser projeto prático');
})();

// Teste 14: Pontos devem variar por nível
(() => {
  const basico = executarComandoDesafio('Java', 'Básico');
  const intermediario = executarComandoDesafio('Java', 'Intermediário');
  const avancado = executarComandoDesafio('Java', 'Avançado');
  
  assertContains(basico, '100', 'Nível Básico deve ter 100 pontos');
  assertContains(intermediario, '250', 'Nível Intermediário deve ter 250 pontos');
  assertContains(avancado, '500', 'Nível Avançado deve ter 500 pontos');
})();

// Teste 15: Deve ser case-insensitive
(() => {
  const resultadoLower = executarComandoDesafio('java', 'básico');
  const resultadoUpper = executarComandoDesafio('JAVA', 'BÁSICO');
  
  assertContains(resultadoLower, 'Java', 'Deve funcionar com lowercase');
  assertContains(resultadoUpper, 'Java', 'Deve funcionar com uppercase');
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
