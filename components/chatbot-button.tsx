"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! I'm OngukaMatt's AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { sender: "user", text: input }])

    // Simulate bot response
    setTimeout(() => {
      let response = "I'm sorry, I don't have an answer for that yet."

      if (input.toLowerCase().includes("recommend") || input.toLowerCase().includes("suggestion")) {
        response = "I'd recommend trying our Jollof Rice or Egusi Soup - they're customer favorites!"
      } else if (input.toLowerCase().includes("delivery") || input.toLowerCase().includes("time")) {
        response = "Our average delivery time is 30-45 minutes depending on your location."
      } else if (input.toLowerCase().includes("payment") || input.toLowerCase().includes("mpesa")) {
        response = "We accept MPesa, credit cards, and cash on delivery."
      }

      setMessages((prev: { sender: string; text: string }[]) => [...prev, { sender: "bot", text: response }])
    }, 1000)

    setInput("")
  }

  return (
    <>
      <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-lg border rounded-lg overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-primary p-4 text-primary-foreground">
            <h3 className="font-medium">OngukaMatt AI Assistant</h3>
            <p className="text-sm opacity-90">Ask me for food suggestions!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </Card>
      )}
    </>
  )
}
