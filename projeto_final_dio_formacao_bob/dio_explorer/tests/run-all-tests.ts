import * as fs from 'fs';
import * as path from 'path';

console.log('\n' + '='.repeat(70));
console.log('🧪 EXECUTANDO SUITE COMPLETA DE TESTES - DIO EXPLORER');
console.log('='.repeat(70) + '\n');

// Importar e executar testes
console.log('⏳ Iniciando testes...\n');

const startTime = Date.now();

// Executar testes de trilha
console.log('📚 Módulo: Trilha');
const trilhaTests = require('./trilha.test');

// Executar testes de desafio
console.log('\n📚 Módulo: Desafio');
const desafioTests = require('./desafio.test');

// Executar testes de certificado
console.log('\n📚 Módulo: Certificado');
const certificadoTests = require('./certificado.test');

const endTime = Date.now();
const executionTime = ((endTime - startTime) / 1000).toFixed(2);

// Consolidar resultados
const totalPassed = trilhaTests.testResults.passed + 
                    desafioTests.testResults.passed + 
                    certificadoTests.testResults.passed;

const totalFailed = trilhaTests.testResults.failed + 
                    desafioTests.testResults.failed + 
                    certificadoTests.testResults.failed;

const totalTests = totalPassed + totalFailed;
const successRate = ((totalPassed / totalTests) * 100).toFixed(2);

// Relatório consolidado
console.log('\n' + '='.repeat(70));
console.log('📊 RELATÓRIO CONSOLIDADO DE TESTES');
console.log('='.repeat(70));

console.log('\n📈 Resultados por Módulo:');
console.log(`\n  🔹 Trilha:`);
console.log(`     ✅ Passou: ${trilhaTests.testResults.passed}`);
console.log(`     ❌ Falhou: ${trilhaTests.testResults.failed}`);
console.log(`     🎯 Taxa: ${trilhaTests.testResults.successRate.toFixed(2)}%`);

console.log(`\n  🔹 Desafio:`);
console.log(`     ✅ Passou: ${desafioTests.testResults.passed}`);
console.log(`     ❌ Falhou: ${desafioTests.testResults.failed}`);
console.log(`     🎯 Taxa: ${desafioTests.testResults.successRate.toFixed(2)}%`);

console.log(`\n  🔹 Certificado:`);
console.log(`     ✅ Passou: ${certificadoTests.testResults.passed}`);
console.log(`     ❌ Falhou: ${certificadoTests.testResults.failed}`);
console.log(`     🎯 Taxa: ${certificadoTests.testResults.successRate.toFixed(2)}%`);

console.log('\n' + '-'.repeat(70));
console.log('\n📊 Totais Gerais:');
console.log(`   ✅ Testes Aprovados: ${totalPassed}`);
console.log(`   ❌ Testes Reprovados: ${totalFailed}`);
console.log(`   📈 Total de Testes: ${totalTests}`);
console.log(`   🎯 Taxa de Sucesso: ${successRate}%`);
console.log(`   ⏱️  Tempo de Execução: ${executionTime}s`);

// Verificar se atingiu a meta de 70%
const metaAtingida = parseFloat(successRate) >= 70;
console.log(`\n   ${metaAtingida ? '✅' : '❌'} Meta de 70% de cobertura: ${metaAtingida ? 'ATINGIDA' : 'NÃO ATINGIDA'}`);

// Listar testes que falharam
const allFailedTests = [
  ...trilhaTests.testResults.failedTests.map((t: string) => `[Trilha] ${t}`),
  ...desafioTests.testResults.failedTests.map((t: string) => `[Desafio] ${t}`),
  ...certificadoTests.testResults.failedTests.map((t: string) => `[Certificado] ${t}`)
];

if (allFailedTests.length > 0) {
  console.log('\n❌ Testes que Falharam:');
  allFailedTests.forEach(test => console.log(`   - ${test}`));
}

console.log('\n' + '='.repeat(70));

// Gerar relatório em formato JSON
const report = {
  timestamp: new Date().toISOString(),
  executionTime: `${executionTime}s`,
  summary: {
    total: totalTests,
    passed: totalPassed,
    failed: totalFailed,
    successRate: `${successRate}%`,
    metaAtingida
  },
  modules: {
    trilha: trilhaTests.testResults,
    desafio: desafioTests.testResults,
    certificado: certificadoTests.testResults
  },
  failedTests: allFailedTests
};

// Salvar relatório
const reportPath = path.join(__dirname, '../docs/test-report.json');
const reportDir = path.dirname(reportPath);

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
console.log(`\n💾 Relatório salvo em: ${reportPath}`);

console.log('\n' + '='.repeat(70) + '\n');

// Exportar resultados
export const consolidatedResults = report;

// Made with Bob
