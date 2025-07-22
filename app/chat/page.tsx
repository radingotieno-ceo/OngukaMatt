"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone } from "lucide-react"
import ChatbotButton from "@/components/chatbot-button"

interface Message {
  id: number
  sender: "user" | "delivery"
  text: string
  timestamp: Date
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<number>(1)
  const [input, setInput] = useState("")
  const [chats, setChats] = useState<
    {
      id: number
      name: string
      avatar: string
      lastMessage: string
      unread: number
      messages: Message[]
    }[]
  >([
    {
      id: 1,
      name: "John Delivery",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'm on my way with your order",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "delivery",
          text: "Hello! I'm John, your delivery person for today.",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: 2,
          sender: "delivery",
          text: "I've picked up your order and I'm on my way.",
          timestamp: new Date(Date.now() - 1800000),
        },
        {
          id: 3,
          sender: "user",
          text: "Great! How long will it take?",
          timestamp: new Date(Date.now() - 1700000),
        },
        {
          id: 4,
          sender: "delivery",
          text: "I should be there in about 15 minutes.",
          timestamp: new Date(Date.now() - 1600000),
        },
        {
          id: 5,
          sender: "delivery",
          text: "I'm on my way with your order",
          timestamp: new Date(Date.now() - 300000),
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Delivery",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Your order has been delivered. Enjoy!",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "delivery",
          text: "Hi there! I'm Sarah, delivering your order today.",
          timestamp: new Date(Date.now() - 86400000),
        },
        {
          id: 2,
          sender: "delivery",
          text: "I've arrived at your location.",
          timestamp: new Date(Date.now() - 86000000),
        },
        {
          id: 3,
          sender: "user",
          text: "I'll come down to pick it up.",
          timestamp: new Date(Date.now() - 85000000),
        },
        {
          id: 4,
          sender: "delivery",
          text: "Your order has been delivered. Enjoy!",
          timestamp: new Date(Date.now() - 84000000),
        },
      ],
    },
  ])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: chats[activeChat - 1].messages.length + 1,
      sender: "user",
      text: input,
      timestamp: new Date(),
    }

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: input,
        }
      }
      return chat
    })

    setChats(updatedChats)
    setInput("")

    // Simulate delivery person response
    setTimeout(() => {
      const responseMessage: Message = {
        id: updatedChats[activeChat - 1].messages.length + 1,
        sender: "delivery",
        text: "I'll be there shortly. Thanks for your patience!",
        timestamp: new Date(),
      }

      const updatedChatsWithResponse = updatedChats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, responseMessage],
            lastMessage: responseMessage.text,
          }
        }
        return chat
      })

      setChats(updatedChatsWithResponse)
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const currentChat = chats.find((chat) => chat.id === activeChat)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Chat with Delivery</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      activeChat === chat.id ? "bg-muted" : ""
                    }`}
                    onClick={() => {
                      setActiveChat(chat.id)
                      // Mark as read when clicked
                      setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(chat.messages[chat.messages.length - 1].timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            {currentChat ? (
              <>
                <CardHeader className="border-b px-4 py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={currentChat.avatar || "/placeholder.svg"} alt={currentChat.name} />
                        <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{currentChat.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">Delivery Person</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                  {currentChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{message.text}</span>
                          <span className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button onClick={handleSend}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-muted-foreground">Select a chat to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      <ChatbotButton />
    </div>
  )
}
