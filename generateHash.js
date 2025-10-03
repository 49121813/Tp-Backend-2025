import bcrypt from 'bcrypt';

const password = '5678';
const hash = await bcrypt.hash(password, 10);

console.log('Copia este hash:');
console.log(hash);