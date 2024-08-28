import axios from 'axios';

const memoryPublicKey = new Map<string, string>();

/**
 * 퍼블릭 키를 가져옵니다.
 * @param certUrl
 * @param useMemory. 캐시를 메모리에서 할지 여부. 기본값은 localStorage
 */
export const fetchJWKs = async (certUrl: string, useMemory = false) => {
  let publicKey = null;

  if (useMemory) {
    const cachedKey = memoryPublicKey.get(certUrl);
    if (cachedKey) {
      publicKey = cachedKey;
    }
  } else {
    publicKey = localStorage.getItem('publicKey');
  }

  if (publicKey === null) {
    // /realms/{realm-name}/protocol/openid-connect/certs
    const res = await axios.get(certUrl);
    if (res.data) {
      publicKey = JSON.stringify(res.data);

      if (useMemory) {
        memoryPublicKey.set(certUrl, publicKey);
      } else {
        localStorage.setItem('publicKey', publicKey);
      }
    } else {
      console.error(
        'failed verify IdToken, caused by fetching failed public key.'
      );
      return null;
    }
  }

  return JSON.parse(publicKey!).keys;
};
