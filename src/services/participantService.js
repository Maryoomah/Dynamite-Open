import CryptoJS from 'crypto-js';

const INITIAL_DATA = [];

// Storage Configuration from Environment
const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || '_dx_p_v1_sync';
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'fallback-secure-key';

const encryptMode = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptMode = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

export const participantService = {
  getFee: (category, subCategory) => {
    if (category === 'School Registration') return 0;
    if (
      subCategory.toLowerCase().includes('student') ||
      subCategory.toLowerCase().includes('female')
    )
      return 10000;
    return 15000;
  },
  getParticipants: () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const decrypted = decryptMode(saved);
      if (decrypted) return decrypted;
    }

    // Fallback/First run: Encrypt initial data and save
    const encryptedInitial = encryptMode(INITIAL_DATA);
    localStorage.setItem(STORAGE_KEY, encryptedInitial);
    return INITIAL_DATA;
  },

  saveParticipants: (data) => {
    const encrypted = encryptMode(data);
    localStorage.setItem(STORAGE_KEY, encrypted);
  },

  addParticipant: (participant) => {
    const data = participantService.getParticipants();
    const newParticipant = {
      ...participant,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
    };
    const updated = [...data, newParticipant];
    participantService.saveParticipants(updated);
    return updated;
  },

  updateParticipant: (id, updatedFields) => {
    const data = participantService.getParticipants();
    const updated = data.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p,
    );
    participantService.saveParticipants(updated);
    return updated;
  },

  deleteParticipant: (id) => {
    const data = participantService.getParticipants();
    const updated = data.filter((p) => p.id !== id);
    participantService.saveParticipants(updated);
    return updated;
  },

  verifyAdminCode: (code) => {
    // Code from Environment
    const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE || 'J4YU-6AQ-K5L2';
    return code.toUpperCase() === ADMIN_CODE;
  },
};
