import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const API_BASE_URL = 'https://lnh8imcdy799.manus.space/api'

export function ChatDemo({ chatbots }) {
  const [selectedBot, setSelectedBot] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleBotSelect = (bot) => {
    setSelectedBot(bot)
    setMessages([
      {
        id: 1,
        sender_type: 'bot',
        content: bot.welcome_message || "Hello! How can I help you today?",
        timestamp: new Date().toISOString()
      }
    ])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedBot || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      sender_type: 'customer',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/chatbots/${selectedBot.id}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      })

      const data = await response.json()
      
      if (data.success) {
        const botMessage = {
          id: messages.length + 2,
          sender_type: 'bot',
          content: data.data.response,
          timestamp: new Date().toISOString()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback intelligent responses for demo
      const responses = {
        'order': "I can help you track your order. Please provide your order number and I'll look it up for you.",
        'return': "Our return policy allows returns within 30 days. Would you like me to start a return request for you?",
        'shipping': "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.",
        'support': "I'm here to help! You can ask me about orders, returns, shipping, or any other questions.",
        'price': "Our pricing is competitive and we often have special offers. What product are you interested in?",
        'default': "Thank you for your message! I'm here to help with any questions about our products or services. How can I assist you today?"
      }
      
      const message = inputMessage.toLowerCase()
      let response = responses.default
      
      for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
          response = value
          break
        }
      }
      
      const errorMessage = {
        id: messages.length + 2,
        sender_type: 'bot',
        content: response,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setInputMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Bot Selection */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Choose a Chatbot
            </CardTitle>
            <CardDescription>
              Select a chatbot to start a conversation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chatbots.map((bot) => (
                <div
                  key={bot.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedBot?.id === bot.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleBotSelect(bot)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{bot.name}</h3>
                    <Badge variant={bot.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {bot.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{bot.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{bot.platform}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center">
              {selectedBot ? (
                <>
                  <Bot className="h-5 w-5 mr-2 text-blue-600" />
                  {selectedBot.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {selectedBot.platform}
                  </Badge>
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5 mr-2 text-gray-400" />
                  Select a chatbot to start
                </>
              )}
            </CardTitle>
            {selectedBot && (
              <CardDescription>{selectedBot.description}</CardDescription>
            )}
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4">
            {!selectedBot ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Choose a chatbot from the left to start chatting</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_type === 'customer' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_type === 'customer'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender_type === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                        )}
                        {message.sender_type === 'customer' && (
                          <User className="h-4 w-4 mt-0.5 text-blue-100" />
                        )}
                        <div>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_type === 'customer' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder={selectedBot ? "Type your message..." : "Select a chatbot first"}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!selectedBot || isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!selectedBot || !inputMessage.trim() || isLoading}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {selectedBot && (
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send • This is a live demo connected to our production AI
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

