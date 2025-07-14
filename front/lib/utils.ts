import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para generar un ID único para el visitante
export function generateVisitorId() {
  return 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Función para obtener el ID del visitante actual
export function getVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}
