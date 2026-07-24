'use server'
 
import { cookies } from 'next/headers'
 
export async function createCookie(name: string, value: any) {
  const cookieStore = await cookies()
 
  cookieStore.set({
    name,
    value: JSON.stringify(value),
    httpOnly: true,
    path: '/',
  })
}

export async function readCookie(name: string) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(name)

  if (cookie) {
    try {
      return cookie.value
    } catch (error) {
      console.error('Error parsing cookie value:', error)
      return null
    }
  }

  return null
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.set({
    name,
    value: '',
    maxAge: 0,
    path: '/',
  })
}