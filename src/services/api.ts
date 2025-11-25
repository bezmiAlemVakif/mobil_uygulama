// Placeholder API service abstraction (can be replaced when backend is ready)
import { mockTedaviler, mockProfil } from './mock-data'
import type { Tedavi } from '../types/tedavi'
import type { KullaniciProfil } from '../types/user'

export async function fetchProfil(): Promise<KullaniciProfil> {
  await new Promise(r => setTimeout(r, 300))
  return mockProfil
}

export async function fetchTedaviler(): Promise<Tedavi[]> {
  await new Promise(r => setTimeout(r, 300))
  return mockTedaviler
}

export async function fetchTedavi(id: number): Promise<Tedavi | undefined> {
  await new Promise(r => setTimeout(r, 300))
  return mockTedaviler.find(t => t.id === id)
}
