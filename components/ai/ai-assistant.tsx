"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Mic, MicOff, Zap, Home, DollarSign, Vote, Lightbulb } from "lucide-react"

const aiAgents = [
  {
    id: "energy",
    name: "Energy Agent",
    icon: Zap,
    color: "text-yellow-500",
    description: "Optimizes energy usage and trading",
    specialties: ["Solar optimization", "Energy trading", "Consumption analysis"],
  },
  {
    id: "housing",
    name: "Housing Agent",
    icon: Home,
    color: "text-blue-500",
    description: "Manages housing and community planning",
    specialties: ["Housing allocation", "Maintenance scheduling", "Community planning"],
  },
  {
    id: "finance",
    name: "Finance Agent",
    icon: DollarSign,
    color: "text-green-500",
    description: "Provides financial advice and services",
    specialties: ["Loan recommendations", "Savings optimization", "Community currency"],
  },
  {
    id: "governance",
    name: "Governance Agent",
    icon: Vote,
    color: "text-purple-500",
    description: "Facilitates democratic participation",
    specialties: ["Proposal analysis", "Voting guidance", "Policy explanation"],
  },
]

const sampleConversations = {
  energy: [
    { role: "user", content: "How can I optimize my solar panel output?" },
    {
      role: "assistant",
      content:
        "Based on your current setup and weather patterns, I recommend adjusting your panel angle by 15 degrees and cleaning them weekly. This could increase output by 12%.",
    },
  ],
  housing: [
    { role: "user", content: "Are there any available 2BR units?" },
    {
      role: "assistant",
      content:
        "Yes! I found 3 available 2BR units. The one on Solar Street has the best energy efficiency rating and includes smart home features.",
    },
  ],
  finance: [
    { role: "user", content: "Should I apply for a home improvement loan?" },
    {
      role: "assistant",
      content:
        "Given your credit score of 742 and stable income, you qualify for our 3.2% APR loan. The solar panel upgrade would pay for itself in 4 years.",
    },
  ],
  governance: [
    { role: "user", content: "What should I know about the solar farm proposal?" },
    {
      role: "assistant",
      content:
        "The proposal would increase community energy independence by 50% and create 12 local jobs. Environmental impact is minimal with proper planning.",
    },
  ],
}

export function AIAssistant() {
  const [activeAgent, setActiveAgent] = useState("energy")
  const [messages, setMessages] = useState<any[]>(
    sampleConversations[activeAgent as keyof typeof sampleConversations] || [],
  )
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMessages(sampleConversations[activeAgent as keyof typeof sampleConversations] || [])
  }, [activeAgent])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage = { role: "user", content: inputMessage }
    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        energy: [
          "I'll analyze your energy consumption patterns and provide optimization recommendations.",
          "Based on current solar conditions, I suggest adjusting your energy usage schedule.",
          "Your battery storage is at optimal levels. Consider selling excess energy to the community.",
        ],
        housing: [
          "Let me check the available housing units that match your criteria.",
          "I've found several maintenance requests in your area that need attention.",
          "The community planning committee has new proposals for your review.",
        ],
        finance: [
          "I'll review your financial profile and suggest the best loan options.",
          "Your savings goals are on track. Here are some optimization strategies.",
          "Community currency exchange rates are favorable right now.",
        ],
        governance: [
          "I'll explain the current proposals and their potential impact on the community.",
          "Based on your voting history, here are proposals you might be interested in.",
          "The governance committee has scheduled new community discussions.",
        ],
      }

      const agentResponses = responses[activeAgent as keyof typeof responses]
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)]

      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with Web Speech API
  }

  const currentAgent = aiAgents.find((agent) => agent.id === activeAgent)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <Badge variant="outline" className="text-sm">
          Multi-Agent System
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Agents</CardTitle>
              <CardDescription>Choose your specialized assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {aiAgents.map((agent) => (
                <Button
                  key={agent.id}
                  variant={activeAgent === agent.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveAgent(agent.id)}
                >
                  <agent.icon className={`h-4 w-4 mr-2 ${agent.color}`} />
                  {agent.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {currentAgent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <currentAgent.icon className={`h-5 w-5 ${currentAgent.color}`} />
                  {currentAgent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{currentAgent.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Specialties:</p>
                  {currentAgent.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                {currentAgent && <currentAgent.icon className={`h-5 w-5 ${currentAgent.color}`} />}
                Chat with {currentAgent?.name}
              </CardTitle>
              <CardDescription>Ask questions and get personalized recommendations</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4" />
                            <span className="text-xs font-medium">{currentAgent?.name}</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask ${currentAgent?.name} anything...`}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVoiceInput}
                  className={isListening ? "bg-red-100 text-red-600" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks you can ask your AI agents to help with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start bg-transparent"
              onClick={() => {
                setActiveAgent("energy")
                setInputMessage("Show me my energy consumption analysis")
              }}
            >
              <Zap className="h-5 w-5 text-yellow-500 mb-2" />
              <span className="font-medium">Energy Analysis</span>
              <span className="text-xs text-muted-foreground">Get consumption insights</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start bg-transparent"
              onClick={() => {
                setActiveAgent("housing")
                setInputMessage("What housing units are available?")
              }}
            >
              <Home className="h-5 w-5 text-blue-500 mb-2" />
              <span className="font-medium">Find Housing</span>
              <span className="text-xs text-muted-foreground">Browse available units</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start bg-transparent"
              onClick={() => {
                setActiveAgent("finance")
                setInputMessage("Review my financial health")
              }}
            >
              <DollarSign className="h-5 w-5 text-green-500 mb-2" />
              <span className="font-medium">Financial Review</span>
              <span className="text-xs text-muted-foreground">Check your finances</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start bg-transparent"
              onClick={() => {
                setActiveAgent("governance")
                setInputMessage("What proposals should I vote on?")
              }}
            >
              <Vote className="h-5 w-5 text-purple-500 mb-2" />
              <span className="font-medium">Voting Guide</span>
              <span className="text-xs text-muted-foreground">Get voting recommendations</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
