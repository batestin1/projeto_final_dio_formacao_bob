/**
 * Exemplo de Uso - DIO Explorer
 * 
 * Este arquivo demonstra como utilizar os comandos slash do DIO Explorer
 */

import processarComando, {
  executarComandoTrilha,
  executarComandoDesafio,
  executarComandoCertificado
} from './commands';

console.log('='.repeat(80));
console.log('🚀 DIO EXPLORER - EXEMPLOS DE USO');
console.log('='.repeat(80));
console.log();

// ============================================================================
// EXEMPLO 1: Comando /help
// ============================================================================
console.log('📚 EXEMPLO 1: Comando /help');
console.log('-'.repeat(80));
const help = processarComando('/help');
console.log(help);
console.log();
console.log();

// ============================================================================
// EXEMPLO 2: Comando /trilha
// ============================================================================
console.log('📚 EXEMPLO 2: Comando /trilha Python');
console.log('-'.repeat(80));
const trilhaPython = processarComando('/trilha Python');
console.log(trilhaPython);
console.log();
console.log();

// ============================================================================
// EXEMPLO 3: Comando /trilha com tecnologia diferente
// ============================================================================
console.log('📚 EXEMPLO 3: Comando /trilha JavaScript');
console.log('-'.repeat(80));
const trilhaJS = processarComando('/trilha JavaScript');
console.log(trilhaJS);
console.log();
console.log();

// ============================================================================
// EXEMPLO 4: Comando /desafio básico
// ============================================================================
console.log('🎯 EXEMPLO 4: Comando /desafio Python');
console.log('-'.repeat(80));
const desafioPython = processarComando('/desafio Python');
console.log(desafioPython);
console.log();
console.log();

// ============================================================================
// EXEMPLO 5: Comando /desafio com nível específico
// ============================================================================
console.log('🎯 EXEMPLO 5: Comando /desafio JavaScript Intermediário');
console.log('-'.repeat(80));
const desafioJS = processarComando('/desafio JavaScript Intermediário');
console.log(desafioJS);
console.log();
console.log();

// ============================================================================
// EXEMPLO 6: Comando /certificado
// ============================================================================
console.log('🎓 EXEMPLO 6: Comando /certificado');
console.log('-'.repeat(80));
const certificado = processarComando('/certificado "João Silva" "Python"');
console.log(certificado);
console.log();
console.log();

// ============================================================================
// EXEMPLO 7: Usando funções individuais
// ============================================================================
console.log('🔧 EXEMPLO 7: Usando funções individuais');
console.log('-'.repeat(80));

console.log('7.1 - executarComandoTrilha("React")');
const trilhaReact = executarComandoTrilha('React');
console.log(trilhaReact.substring(0, 500) + '...\n');

console.log('7.2 - executarComandoDesafio("Java", "Avançado")');
const desafioJava = executarComandoDesafio('Java', 'Avançado');
console.log(desafioJava.substring(0, 500) + '...\n');

console.log('7.3 - executarComandoCertificado("Maria Santos", "JavaScript")');
const certJS = executarComandoCertificado('Maria Santos', 'JavaScript');
console.log(certJS.substring(0, 500) + '...\n');

console.log();
console.log();

// ============================================================================
// EXEMPLO 8: Tratamento de erros
// ============================================================================
console.log('❌ EXEMPLO 8: Tratamento de erros');
console.log('-'.repeat(80));

console.log('8.1 - Comando inválido');
const erroComando = processarComando('/comandoInvalido');
console.log(erroComando);
console.log();

console.log('8.2 - Tecnologia não encontrada');
const erroTecnologia = processarComando('/trilha TecnologiaInexistente');
console.log(erroTecnologia);
console.log();

console.log('8.3 - Parâmetros faltando');
const erroParametros = processarComando('/certificado');
console.log(erroParametros);
console.log();

console.log();
console.log('='.repeat(80));
console.log('✅ EXEMPLOS CONCLUÍDOS!');
console.log('='.repeat(80));

// ============================================================================
// EXEMPLO 9: Casos de uso práticos
// ============================================================================
console.log();
console.log('💡 CASOS DE USO PRÁTICOS');
console.log('='.repeat(80));
console.log();

console.log('Caso 1: Estudante quer aprender Python');
console.log('Passo 1: Ver trilha disponível');
const caso1Passo1 = processarComando('/trilha Python');
console.log('✓ Trilha encontrada\n');

console.log('Passo 2: Gerar desafio para praticar');
const caso1Passo2 = processarComando('/desafio Python Básico');
console.log('✓ Desafio gerado\n');

console.log('Passo 3: Após completar, gerar certificado');
const caso1Passo3 = processarComando('/certificado "Ana Costa" "Python"');
console.log('✓ Certificado emitido\n');

console.log();
console.log('Caso 2: Desenvolvedor quer se especializar em React');
console.log('Passo 1: Explorar trilha de React');
const caso2Passo1 = processarComando('/trilha React');
console.log('✓ Trilha encontrada\n');

console.log('Passo 2: Desafio intermediário');
const caso2Passo2 = processarComando('/desafio React Intermediário');
console.log('✓ Desafio gerado\n');

console.log();
console.log('Caso 3: Profissional buscando certificação em DevOps');
console.log('Passo 1: Ver trilha DevOps');
const caso3Passo1 = processarComando('/trilha DevOps');
console.log('✓ Trilha encontrada\n');

console.log('Passo 2: Desafio avançado');
const caso3Passo2 = processarComando('/desafio DevOps Avançado');
console.log('✓ Desafio gerado\n');

console.log('Passo 3: Certificado de conclusão');
const caso3Passo3 = processarComando('/certificado "Carlos Mendes" "DevOps"');
console.log('✓ Certificado emitido\n');

console.log();
console.log('='.repeat(80));
console.log('🎉 TODOS OS EXEMPLOS FORAM EXECUTADOS COM SUCESSO!');
console.log('='.repeat(80));
console.log();
console.log('📝 Próximos passos:');
console.log('1. Explore os comandos disponíveis com /help');
console.log('2. Escolha uma trilha com /trilha <tecnologia>');
console.log('3. Pratique com /desafio <tecnologia> [nivel]');
console.log('4. Conquiste seu certificado com /certificado "<nome>" "<tecnologia>"');
console.log();
console.log('🚀 Boa jornada de aprendizado!');

// Made with Bob
