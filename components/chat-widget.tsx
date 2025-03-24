"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  text: string
  sender: "user" | "admin"
  timestamp: Date
  isTyping?: boolean
  attachment?: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can we help you today?",
      sender: "admin",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [attachment, setAttachment] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() === "" && !attachment) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      attachment: attachment || undefined,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setAttachment(null)

    // Show typing indicator
    setIsTyping(true)
    const typingMessage: Message = {
      id: messages.length + 2,
      text: "",
      sender: "admin",
      timestamp: new Date(),
      isTyping: true,
    }

    setMessages((prev) => [...prev, typingMessage])

    // Simulate admin response after a delay
    setTimeout(() => {
      // Remove typing indicator and add actual response
      setIsTyping(false)
      setMessages((prev) => prev.filter((msg) => !msg.isTyping))

      const adminMessage: Message = {
        id: messages.length + 3,
        text: "Thank you for your message. One of our team members will get back to you shortly.",
        sender: "admin",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, adminMessage])
    }, 2000)
  }

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setAttachment(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const removeAttachment = () => {
    setAttachment(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header bg-primary text-primary-foreground">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Chat with SolFit</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "message",
                  message.sender === "user"
                    ? "user-message bg-primary text-primary-foreground ml-auto"
                    : "admin-message bg-secondary text-secondary-foreground",
                  message.isTyping && "admin-typing",
                )}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                ) : (
                  <>
                    {message.text}
                    {message.attachment && (
                      <div className="mt-2">
                        <img
                          src={message.attachment || "/placeholder.svg"}
                          alt="Attachment"
                          className="max-w-full rounded-md max-h-32"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {attachment && (
            <div className="p-2 border-t border-border">
              <div className="relative inline-block">
                <img src={attachment || "/placeholder.svg"} alt="Attachment preview" className="h-16 rounded-md" />
                <button
                  onClick={removeAttachment}
                  className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-md"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="chat-input border-border bg-background">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-secondary/50"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAttachment}
              accept="image/*"
              className="hidden"
              id="chat-attachment"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" className="bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <Button onClick={toggleChat} className="chat-bubble bg-primary text-primary-foreground">
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}

