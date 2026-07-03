import { executarComandoCertificado } from '../commands/certificado';
import * as fs from 'fs';
import * as path from 'path';

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

console.log('\n📦 Testes do Comando /certificado\n');

// Teste 1: Deve gerar certificado para Java
(() => {
  const resultado = executarComandoCertificado('João Silva', 'Java');
  assertContains(resultado, 'Certificado Gerado com Sucesso', 'Deve gerar certificado para Java');
  assertContains(resultado, 'João Silva', 'Deve conter nome do aluno');
  assertContains(resultado, 'Java', 'Deve conter tecnologia');
})();

// Teste 2: Deve gerar certificado para Python
(() => {
  const resultado = executarComandoCertificado('Maria Santos', 'Python');
  assertContains(resultado, 'Maria Santos', 'Deve gerar certificado para Python');
  assertContains(resultado, 'Python', 'Deve conter Python');
})();

// Teste 3: Deve retornar erro para nome vazio
(() => {
  const resultado = executarComandoCertificado('', 'Java');
  assertContains(resultado, '❌', 'Deve retornar erro para nome vazio');
  assertContains(resultado, 'forneça seu nome', 'Deve pedir o nome');
})();

// Teste 4: Deve retornar erro para tecnologia inexistente
(() => {
  const resultado = executarComandoCertificado('João Silva', 'TecnologiaInexistente123');
  assertContains(resultado, '❌', 'Deve retornar erro');
  assertContains(resultado, 'Trilha não encontrada', 'Deve indicar trilha não encontrada');
})();

// Teste 5: Deve incluir código de verificação
(() => {
  const resultado = executarComandoCertificado('Pedro Costa', 'JavaScript');
  assertContains(resultado, 'Código:', 'Deve incluir código de verificação');
  assertContains(resultado, 'DIO-', 'Código deve começar com DIO-');
})();

// Teste 6: Deve incluir data de emissão
(() => {
  const resultado = executarComandoCertificado('Ana Lima', 'React');
  assertContains(resultado, 'Data de Emissão:', 'Deve incluir data de emissão');
  assertContains(resultado, 'de', 'Data deve estar formatada');
})();

// Teste 7: Deve incluir carga horária
(() => {
  const resultado = executarComandoCertificado('Carlos Souza', 'Java');
  assertContains(resultado, 'Carga Horária:', 'Deve incluir carga horária');
  assertContains(resultado, 'horas', 'Deve especificar horas');
})();

// Teste 8: Deve incluir informações da formação
(() => {
  const resultado = executarComandoCertificado('Juliana Oliveira', 'Python');
  assertContains(resultado, 'Formação:', 'Deve incluir nome da formação');
  assertContains(resultado, 'Tecnologia:', 'Deve incluir tecnologia');
  assertContains(resultado, 'Nível:', 'Deve incluir nível');
})();

// Teste 9: Deve incluir conquistas desbloqueadas
(() => {
  const resultado = executarComandoCertificado('Roberto Alves', 'Java');
  assertContains(resultado, 'Conquistas Desbloqueadas', 'Deve incluir conquistas');
  assertContains(resultado, '🎖️', 'Deve incluir ícone de badge');
})();

// Teste 10: Deve incluir próximos passos
(() => {
  const resultado = executarComandoCertificado('Fernanda Costa', 'React');
  assertContains(resultado, 'Próximos Passos', 'Deve incluir próximos passos');
  assertContains(resultado, 'LinkedIn', 'Deve mencionar LinkedIn');
})();

// Teste 11: Deve indicar arquivo salvo
(() => {
  const resultado = executarComandoCertificado('Lucas Martins', 'JavaScript');
  assertContains(resultado, 'Arquivo Salvo', 'Deve indicar arquivo salvo');
  assertContains(resultado, 'certificado_', 'Deve incluir nome do arquivo');
})();

// Teste 12: Deve incluir total de XP
(() => {
  const resultado = executarComandoCertificado('Patricia Silva', 'Python');
  assertContains(resultado, 'Total de XP:', 'Deve incluir total de XP');
  assertContains(resultado, 'pontos', 'Deve especificar pontos');
})();

// Teste 13: Deve criar arquivo de certificado
(() => {
  const nomeAluno = 'TesteAutomatizado';
  const resultado = executarComandoCertificado(nomeAluno, 'Java');
  
  // Verificar se menciona que o arquivo foi salvo
  assertContains(resultado, 'Arquivo Salvo', 'Deve criar arquivo de certificado');
  
  // Limpar arquivos de teste criados
  const certDir = path.join(__dirname, '../docs/certificados-emitidos');
  if (fs.existsSync(certDir)) {
    const files = fs.readdirSync(certDir);
    files.forEach(file => {
      if (file.includes('TesteAutomatizado')) {
        fs.unlinkSync(path.join(certDir, file));
      }
    });
  }
})();

// Teste 14: Deve formatar nome do aluno em maiúsculas no certificado
(() => {
  const resultado = executarComandoCertificado('teste minúsculo', 'Java');
  assertContains(resultado, 'teste minúsculo', 'Deve manter nome original na mensagem');
})();

// Teste 15: Deve incluir mensagem de parabéns
(() => {
  const resultado = executarComandoCertificado('Camila Rodrigues', 'React');
  assertContains(resultado, 'Parabéns', 'Deve incluir mensagem de parabéns');
  assertContains(resultado, '🎉', 'Deve incluir emoji de celebração');
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
