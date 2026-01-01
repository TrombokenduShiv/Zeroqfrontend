import axios from 'axios';

// Configuration matches Backend
interface ChallengeResponse {
  challenge: string;
  timestamp: number;
  signature: string;
  difficulty: number;
}

export const solvePoW = async (backendUrl: string): Promise<any> => {
  console.log("🧩 Requesting Proof-of-Work Challenge...");
  
  // 1. Get the Challenge from Backend
  const { data } = await axios.get<ChallengeResponse>(`${backendUrl}/api/pow/challenge`);
  const { challenge, timestamp, signature, difficulty } = data;

  console.log(`🧩 Solving puzzle (Difficulty: ${difficulty})...`);

  // 2. Solve it (Find a nonce that produces a hash with leading zeros)
  // We use a simple loop. For higher difficulty, this moves to a WebWorker to avoid freezing UI.
  let nonce = 0;
  let hash = '';
  
  // Note: We need a lightweight crypto lib for the browser if 'crypto' isn't available, 
  // but for modern browsers, the subtlecrypto API is best. 
  // For simplicity in this React project, we will use a simple implementation 
  // or you can npm install 'crypto-js' for easier hashing.
  
  // LET'S ASSUME you install crypto-js for the MVP: npm install crypto-js @types/crypto-js
  const CryptoJS = await import('crypto-js');

  const prefix = '0'.repeat(difficulty);
  const start = performance.now();

  while (true) {
    const input = challenge + nonce;
    hash = CryptoJS.SHA256(input).toString();
    
    if (hash.startsWith(prefix)) {
      const timeTaken = (performance.now() - start).toFixed(2);
      console.log(`✅ Puzzle Solved in ${timeTaken}ms!`);
      return {
        challenge,
        timestamp,
        signature,
        nonce,
        solution: hash
      };
    }
    nonce++;
  }
};