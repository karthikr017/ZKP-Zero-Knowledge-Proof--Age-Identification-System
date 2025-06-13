/**
 * Calculates age from birthdate
 * @param birthdate The user's birthdate
 * @returns Age in years
 */
function calculateAge(birthdate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthdate.getFullYear()
  const monthDiff = today.getMonth() - birthdate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--
  }

  return age
}

/**
 * Creates a SHA-256 hash using the Web Crypto API
 * @param data The string to hash
 * @returns Hex string of the hash
 */
async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

/**
 * Generates a Zero-Knowledge Proof for age verification
 *
 * This is a simplified implementation for demonstration purposes.
 * Real ZKP systems use more complex cryptographic protocols.
 *
 * @param birthdate The user's birthdate
 * @param ageThreshold The minimum age to prove
 * @returns A proof string that can be verified
 */
export async function generateAgeProof(birthdate: Date, ageThreshold: number): Promise<string> {
  // Calculate the user's age
  const age = calculateAge(birthdate)

  // Check if the user meets the age threshold
  const meetsThreshold = age >= ageThreshold

  if (!meetsThreshold) {
    throw new Error("You do not meet the age threshold")
  }

  // In a real ZKP system, we would use cryptographic primitives to create a proof
  // without revealing the actual age or birthdate

  // For this demo, we'll create a simplified proof structure

  // Create a timestamp for when the proof was generated
  const timestamp = Date.now()

  // Create a random nonce for this proof
  const nonce = Math.random().toString(36).substring(2, 15)

  // Create a hash of the birthdate using Web Crypto API
  const birthdateHash = await sha256(birthdate.toISOString())

  // Create the proof data structure
  const proofData = {
    v: 1, // version
    t: ageThreshold, // threshold being proven
    h: birthdateHash, // hash of birthdate (would be more complex in real ZKP)
    n: nonce, // nonce for uniqueness
    ts: timestamp, // timestamp
  }

  // Serialize and sign the proof
  // In a real system, this would use proper cryptographic signatures
  const proofString = JSON.stringify(proofData)

  // Create a verification hash that binds all the data together
  const verificationHash = (await sha256(proofString)).substring(0, 16) // Use first 16 chars for brevity

  // Combine the proof data with the verification hash
  const finalProof = {
    ...proofData,
    s: verificationHash, // signature/verification hash
  }

  return btoa(JSON.stringify(finalProof))
}

/**
 * Verifies a Zero-Knowledge Proof for age verification
 *
 * @param proofString The proof provided by the user
 * @param requiredAgeThreshold The minimum age required by the verifier
 * @returns Boolean indicating if the proof is valid
 */
export async function verifyAgeProof(proofString: string, requiredAgeThreshold: number): Promise<boolean> {
  try {
    // Decode the proof
    const proofData = JSON.parse(atob(proofString))

    // Check the proof version
    if (proofData.v !== 1) {
      return false
    }

    // Check if the proof is for the required threshold or higher
    if (proofData.t < requiredAgeThreshold) {
      return false
    }

    // Verify the proof hasn't been tampered with
    const { s, ...dataWithoutSignature } = proofData
    const verificationHash = (await sha256(JSON.stringify(dataWithoutSignature))).substring(0, 16)

    if (verificationHash !== proofData.s) {
      return false
    }

    // Check if the proof is recent (within 24 hours)
    // In a real system, you might want stricter time limits or use a different approach
    const proofAge = Date.now() - proofData.ts
    const maxProofAge = 24 * 60 * 60 * 1000 // 24 hours

    if (proofAge > maxProofAge) {
      return false
    }

    // All checks passed
    return true
  } catch (error) {
    console.error("Error verifying age proof:", error)
    return false
  }
}

/**
 * A more realistic ZKP implementation for age verification would:
 *
 * 1. Use proper cryptographic primitives (e.g., elliptic curves)
 * 2. Implement range proofs to prove age is within a range without revealing the exact value
 * 3. Use proper digital signatures with public/private key pairs
 * 4. Include revocation mechanisms for compromised proofs
 * 5. Implement proper challenge-response protocols to prevent replay attacks
 */
