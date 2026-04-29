import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { VocabWord } from '../types';

interface AppDB extends DBSchema {
  vocabulary: {
    key: string;
    value: VocabWord;
    indexes: { 'by-level': string };
  };
  exercise: {
    key: string;
    value: any;
  };
}

const DB_NAME = 'english_every_day_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<AppDB>> | null = null;

export function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<AppDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('vocabulary')) {
          const vocabStore = db.createObjectStore('vocabulary', { keyPath: 'id' });
          vocabStore.createIndex('by-level', 'level');
        }
        if (!db.objectStoreNames.contains('exercise')) {
          db.createObjectStore('exercise');
        }
      },
    });
  }
  return dbPromise;
}

export async function saveVocabularyBatch(words: VocabWord[]) {
  const db = await initDB();
  const tx = db.transaction('vocabulary', 'readwrite');
  const store = tx.objectStore('vocabulary');
  
  // Use Promise.all for faster bulk insert
  await Promise.all([
    ...words.map(word => store.put(word)),
    tx.done
  ]);
}

export async function getVocabulary(): Promise<VocabWord[]> {
  const db = await initDB();
  return db.getAll('vocabulary');
}

export async function clearVocabulary() {
  const db = await initDB();
  const tx = db.transaction('vocabulary', 'readwrite');
  await tx.objectStore('vocabulary').clear();
  await tx.done;
}

export async function getVocabularyCount(): Promise<number> {
  const db = await initDB();
  return db.count('vocabulary');
}

export async function saveExerciseData(key: string, data: any) {
  const db = await initDB();
  await db.put('exercise', data, key);
}

export async function getExerciseData(key: string): Promise<any> {
  const db = await initDB();
  return db.get('exercise', key);
}

export function isOnline(): boolean {
  return navigator.onLine;
}
