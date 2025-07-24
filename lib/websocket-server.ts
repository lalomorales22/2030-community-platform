import { WebSocketServer } from 'ws'
import { createServer } from 'http'

let wss: WebSocketServer | null = null

export function initWebSocketServer() {
  if (wss) return wss

  const server = createServer()
  wss = new WebSocketServer({ server })

  wss.on('connection', (ws, request) => {
    const url = new URL(request.url!, `http://${request.headers.host}`)
    const userId = url.searchParams.get('userId')

    console.log(`WebSocket connected for user ${userId}`)

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString())
        console.log('Received message:', message)

        // Broadcast to all connected clients
        wss!.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({
              type: 'broadcast',
              data: message,
              timestamp: new Date().toISOString()
            }))
          }
        })
      } catch (error) {
        console.error('WebSocket message error:', error)
      }
    })

    ws.on('close', () => {
      console.log(`WebSocket disconnected for user ${userId}`)
    })

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to 2030 Community Platform',
      timestamp: new Date().toISOString()
    }))
  })

  server.listen(3001, () => {
    console.log('WebSocket server running on port 3001')
  })

  return wss
}

export function broadcastToAll(message: any) {
  if (!wss) return

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({
        type: 'system',
        data: message,
        timestamp: new Date().toISOString()
      }))
    }
  })
}
