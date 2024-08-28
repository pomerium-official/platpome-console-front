import aes from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

// 복호화 가능한 암호화 키
const encryptionKey = process.env.ENCRYPT_KEY!;

// 복호화 가능한 암호화 함수
export function encrypt(value: string): string {
  return aes.encrypt(value, encryptionKey).toString();
}

/**
 * 복호화
 * @param encryptedValue
 */
export function decrypt(encryptedValue: string): string {
  return aes.decrypt(encryptedValue, encryptionKey).toString(encUtf8);
}
