const API_BASE = '/api/habits'

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export interface Habit {
  id: number
  userId: number
  name: string
  description: string
  frequency: string
  createdAt: string
  completedToday: boolean
  streak: number
}

export interface HabitDetail extends Habit {
  logs: { id: number; completedDate: string; createdAt: string }[]
}

export interface CreateHabitPayload {
  name: string
  description: string
  frequency: string
}

export async function fetchHabits(): Promise<Habit[]> {
  const res = await fetch(API_BASE, { headers: authHeaders() })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to fetch habits')
  }
  return res.json()
}

export async function createHabit(payload: CreateHabitPayload): Promise<Habit> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to create habit')
  }
  return res.json()
}

export async function fetchHabitById(id: number): Promise<HabitDetail> {
  const res = await fetch(`${API_BASE}/${id}`, { headers: authHeaders() })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to fetch habit')
  }
  return res.json()
}

export async function toggleHabitLog(id: number): Promise<{ completed: boolean }> {
  const res = await fetch(`${API_BASE}/${id}/log`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to toggle habit log')
  }
  return res.json()
}

export async function updateHabit(id: number, payload: CreateHabitPayload): Promise<Habit> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to update habit')
  }
  return res.json()
}

export async function deleteHabit(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to delete habit')
  }
}
