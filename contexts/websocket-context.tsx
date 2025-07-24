"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"

interface WebSocketContextType {
  socket: WebSocket | null
  connected: boolean
  sendMessage: (message: any) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const ws = new WebSocket(`ws://localhost:3001/ws?userId=${user.id}`)

      ws.onopen = () => {
        setConnected(true)
        console.log("WebSocket connected")
      }

      ws.onclose = () => {
        setConnected(false)
        console.log("WebSocket disconnected")
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
      }

      setSocket(ws)

      return () => {
        ws.close()
      }
    }
  }, [user])

  const sendMessage = (message: any) => {
    if (socket && connected) {
      socket.send(JSON.stringify(message))
    }
  }

  return <WebSocketContext.Provider value={{ socket, connected, sendMessage }}>{children}</WebSocketContext.Provider>
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}
