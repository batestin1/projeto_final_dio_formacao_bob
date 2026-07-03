/**
 * Testes para os Comandos Slash do DIO Explorer
 * 
 * Este arquivo contém testes básicos para validar o funcionamento dos comandos
 */

import processarComando from './index';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function test(name: string, fn: () => boolean, expectedMessage: string = ''): void {
  try {
    const passed = fn();
    results.push({
      name,
      passed,
      message: passed ? '✅ Passou' : `❌ Falhou: ${expectedMessage}`
    });
  } catch (error) {
    results.push({
      name,
      passed: false,
      message: `❌ Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    });
  }
}

console.log('🧪 INICIANDO TESTES DO DIO EXPLORER\n');
console.log('='.repeat(80));
console.log();

// ============================================================================
// TESTES DO COMANDO /help
// ============================================================================
console.log('📚 Testando comando /help');
console.log('-'.repeat(80));

test('help - deve retornar lista de comandos', () => {
  const result = processarComando('/help');
  return result.includes('DIO Explorer') && result.includes('Comandos Disponíveis');
});

test('help - deve incluir comando /trilha', () => {
  const result = processarComando('/help');
  return result.includes('/trilha');
});

test('help - deve incluir comando /desafio', () => {
  const result = processarComando('/help');
  return result.includes('/desafio');
});

test('help - deve incluir comando /certificado', () => {
  const result = processarComando('/help');
  return result.includes('/certificado');
});

console.log();

// ============================================================================
// TESTES DO COMANDO /trilha
// ============================================================================
console.log('📚 Testando comando /trilha');
console.log('-'.repeat(80));

test('trilha - deve encontrar trilha de Python', () => {
  const result = processarComando('/trilha Python');
  return result.includes('Python') && result.includes('Plano de Estudos');
});

test('trilha - deve encontrar trilha de JavaScript', () => {
  const result = processarComando('/trilha JavaScript');
  return result.includes('JavaScript') && result.includes('Plano de Estudos');
});

test('trilha - deve encontrar trilha de Java', () => {
  const result = processarComando('/trilha Java');
  return result.includes('Java') && result.includes('Plano de Estudos');
});

test('trilha - deve retornar erro para tecnologia inexistente', () => {
  const result = processarComando('/trilha TecnologiaInexistente');
  return result.includes('Nenhuma trilha encontrada');
});

test('trilha - deve retornar erro sem parâmetro', () => {
  const result = processarComando('/trilha');
  return result.includes('especifique uma tecnologia');
});

test('trilha - deve incluir informações de módulos', () => {
  const result = processarComando('/trilha Python');
  return result.includes('Módulos:');
});

test('trilha - deve incluir informações de XP', () => {
  const result = processarComando('/trilha Python');
  return result.includes('XP Total:');
});

test('trilha - deve incluir badges disponíveis', () => {
  const result = processarComando('/trilha Python');
  return result.includes('Badges Disponíveis');
});

console.log();

// ============================================================================
// TESTES DO COMANDO /desafio
// ============================================================================
console.log('🎯 Testando comando /desafio');
console.log('-'.repeat(80));

test('desafio - deve gerar desafio para Python', () => {
  const result = processarComando('/desafio Python');
  return result.includes('Desafio de Código') && result.includes('Python');
});

test('desafio - deve gerar desafio para JavaScript', () => {
  const result = processarComando('/desafio JavaScript');
  return result.includes('Desafio de Código') && result.includes('JavaScript');
});

test('desafio - deve aceitar nível Básico', () => {
  const result = processarComando('/desafio Python Básico');
  return result.includes('Básico');
});

test('desafio - deve aceitar nível Intermediário', () => {
  const result = processarComando('/desafio JavaScript Intermediário');
  return result.includes('Intermediário');
});

test('desafio - deve aceitar nível Avançado', () => {
  const result = processarComando('/desafio Java Avançado');
  return result.includes('Avançado');
});

test('desafio - deve retornar erro sem parâmetro', () => {
  const result = processarComando('/desafio');
  return result.includes('especifique uma tecnologia');
});

test('desafio - deve incluir requisitos', () => {
  const result = processarComando('/desafio Python');
  return result.includes('Requisitos');
});

test('desafio - deve incluir dicas', () => {
  const result = processarComando('/desafio Python');
  return result.includes('Dicas');
});

test('desafio - deve incluir exemplos', () => {
  const result = processarComando('/desafio Python');
  return result.includes('Exemplos');
});

test('desafio - deve incluir pontos XP', () => {
  const result = processarComando('/desafio Python');
  return result.includes('Pontos:') && result.includes('XP');
});

console.log();

// ============================================================================
// TESTES DO COMANDO /certificado
// ============================================================================
console.log('🎓 Testando comando /certificado');
console.log('-'.repeat(80));

test('certificado - deve gerar certificado com nome e tecnologia', () => {
  const result = processarComando('/certificado "João Silva" "Python"');
  return result.includes('Certificado Gerado') && result.includes('João Silva');
});

test('certificado - deve incluir código de verificação', () => {
  const result = processarComando('/certificado "Maria Santos" "JavaScript"');
  return result.includes('Código:') && result.includes('DIO-');
});

test('certificado - deve incluir data de emissão', () => {
  const result = processarComando('/certificado "Pedro Oliveira" "Java"');
  return result.includes('Data de Emissão:');
});

test('certificado - deve incluir carga horária', () => {
  const result = processarComando('/certificado "Ana Costa" "React"');
  return result.includes('Carga Horária:');
});

test('certificado - deve retornar erro sem parâmetros', () => {
  const result = processarComando('/certificado');
  return result.includes('forneça seu nome');
});

test('certificado - deve retornar erro com apenas um parâmetro', () => {
  const result = processarComando('/certificado "João Silva"');
  return result.includes('forneça seu nome');
});

test('certificado - deve incluir badges conquistadas', () => {
  const result = processarComando('/certificado "Carlos Mendes" "Python"');
  return result.includes('Conquistas Desbloqueadas');
});

test('certificado - deve incluir XP total', () => {
  const result = processarComando('/certificado "Fernanda Lima" "JavaScript"');
  return result.includes('Total de XP:');
});

console.log();

// ============================================================================
// TESTES DE COMANDOS INVÁLIDOS
// ============================================================================
console.log('❌ Testando comandos inválidos');
console.log('-'.repeat(80));

test('comando inválido - deve retornar erro', () => {
  const result = processarComando('/comandoInvalido');
  return result.includes('Comando desconhecido');
});

test('sem barra - deve retornar erro', () => {
  const result = processarComando('trilha Python');
  return result.includes('Comandos devem começar com');
});

test('comando vazio - deve retornar erro', () => {
  const result = processarComando('/');
  return result.includes('Comando desconhecido') || result.includes('help');
});

console.log();

// ============================================================================
// TESTES DE CASE SENSITIVITY
// ============================================================================
console.log('🔤 Testando case sensitivity');
console.log('-'.repeat(80));

test('comando em maiúsculas - deve funcionar', () => {
  const result = processarComando('/TRILHA Python');
  return result.includes('Plano de Estudos');
});

test('comando em minúsculas - deve funcionar', () => {
  const result = processarComando('/trilha python');
  return result.includes('Plano de Estudos');
});

test('comando misto - deve funcionar', () => {
  const result = processarComando('/TrIlHa PyThOn');
  return result.includes('Plano de Estudos');
});

console.log();

// ============================================================================
// RESULTADOS DOS TESTES
// ============================================================================
console.log('='.repeat(80));
console.log('📊 RESULTADOS DOS TESTES');
console.log('='.repeat(80));
console.log();

const passed = results.filter(r => r.passed).length;
const failed = results.filter(r => !r.passed).length;
const total = results.length;

results.forEach(result => {
  console.log(`${result.passed ? '✅' : '❌'} ${result.name}`);
  if (!result.passed) {
    console.log(`   ${result.message}`);
  }
});

console.log();
console.log('='.repeat(80));
console.log(`Total de testes: ${total}`);
console.log(`✅ Passou: ${passed} (${((passed / total) * 100).toFixed(1)}%)`);
console.log(`❌ Falhou: ${failed} (${((failed / total) * 100).toFixed(1)}%)`);
console.log('='.repeat(80));

if (failed === 0) {
  console.log();
  console.log('🎉 TODOS OS TESTES PASSARAM! 🎉');
  console.log();
} else {
  console.log();
  console.log('⚠️  ALGUNS TESTES FALHARAM');
  console.log('Por favor, revise os erros acima.');
  console.log();
}

// Exportar resultados para uso externo
export { results, passed, failed, total };

// Made with Bob
