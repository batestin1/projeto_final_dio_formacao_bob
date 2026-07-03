/**
 * Script de Teste para Slash Commands
 * 
 * Execute este arquivo para testar os comandos slash localmente
 * Comando: ts-node .bob/test-slash-commands.ts
 */

import processarComando from '../projeto_final_dio_formacao_bob/dio_explorer/commands/index';

console.log('🧪 Testando Slash Commands do DIO Explorer\n');
console.log('='.repeat(80));
console.log('\n');

// Teste 1: Comando /trilha
console.log('📝 Teste 1: Comando /trilha Python\n');
console.log('-'.repeat(80));
const resultado1 = processarComando('/trilha Python');
console.log(resultado1);
console.log('\n');
console.log('='.repeat(80));
console.log('\n');

// Teste 2: Comando /desafio
console.log('📝 Teste 2: Comando /desafio JavaScript Intermediário\n');
console.log('-'.repeat(80));
const resultado2 = processarComando('/desafio JavaScript Intermediário');
console.log(resultado2);
console.log('\n');
console.log('='.repeat(80));
console.log('\n');

// Teste 3: Comando /certificado
console.log('📝 Teste 3: Comando /certificado "João Silva" "Python"\n');
console.log('-'.repeat(80));
const resultado3 = processarComando('/certificado "João Silva" "Python"');
console.log(resultado3);
console.log('\n');
console.log('='.repeat(80));
console.log('\n');

// Teste 4: Comando /help
console.log('📝 Teste 4: Comando /help\n');
console.log('-'.repeat(80));
const resultado4 = processarComando('/help');
console.log(resultado4);
console.log('\n');
console.log('='.repeat(80));
console.log('\n');

// Teste 5: Comando inválido
console.log('📝 Teste 5: Comando inválido\n');
console.log('-'.repeat(80));
const resultado5 = processarComando('/comando-inexistente');
console.log(resultado5);
console.log('\n');
console.log('='.repeat(80));
console.log('\n');

console.log('✅ Todos os testes foram executados!\n');
console.log('💡 Para usar no Bob, digite os comandos diretamente no chat:\n');
console.log('   - /trilha <tecnologia>');
console.log('   - /desafio <tecnologia> [nivel]');
console.log('   - /certificado "<nome>" "<tecnologia>"');
console.log('\n');

// Made with Bob
