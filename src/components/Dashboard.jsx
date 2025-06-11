import { useState } from 'react'
import { BarChart3, MessageSquare, Settings, Users, Bot, Bell, Search, Plus, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold text-gray-900">ChatBot Pro</span>
              </div>
              <Badge variant="secondary">Pro Plan</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button 
              variant={activeTab === 'conversations' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('conversations')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversations
            </Button>
            <Button 
              variant={activeTab === 'chatbots' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('chatbots')}
            >
              <Bot className="h-4 w-4 mr-2" />
              Chatbots
            </Button>
            <Button 
              variant={activeTab === 'analytics' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('analytics')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button 
              variant={activeTab === 'team' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('team')}
            >
              <Users className="h-4 w-4 mr-2" />
              Team
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Chatbot
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,847</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2s</div>
                    <p className="text-xs text-muted-foreground">
                      -0.3s from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <p className="text-xs text-muted-foreground">
                      +0.2 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversations</CardTitle>
                    <CardDescription>Latest customer interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { customer: 'Sarah Johnson', message: 'How do I track my order?', time: '2 min ago', status: 'resolved' },
                        { customer: 'Mike Chen', message: 'What are your return policies?', time: '5 min ago', status: 'active' },
                        { customer: 'Emma Davis', message: 'I need help with my account', time: '12 min ago', status: 'escalated' },
                        { customer: 'John Smith', message: 'Product availability question', time: '18 min ago', status: 'resolved' }
                      ].map((conv, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{conv.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{conv.customer}</p>
                              <p className="text-xs text-gray-500">{conv.message}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={conv.status === 'resolved' ? 'default' : conv.status === 'active' ? 'secondary' : 'destructive'}>
                              {conv.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Chatbots</CardTitle>
                    <CardDescription>Your deployed chatbots</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Website Support Bot', platform: 'Website', conversations: 1247, status: 'active' },
                        { name: 'E-commerce Assistant', platform: 'Shopify', conversations: 892, status: 'active' },
                        { name: 'FAQ Bot', platform: 'Facebook', conversations: 456, status: 'paused' },
                        { name: 'Order Tracking Bot', platform: 'WhatsApp', conversations: 234, status: 'active' }
                      ].map((bot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Bot className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{bot.name}</p>
                              <p className="text-xs text-gray-500">{bot.platform} • {bot.conversations} conversations</p>
                            </div>
                          </div>
                          <Badge variant={bot.status === 'active' ? 'default' : 'secondary'}>
                            {bot.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'conversations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
                <div className="flex space-x-2">
                  <Button variant="outline">Export</Button>
                  <Button variant="outline">Filter</Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Conversations</CardTitle>
                  <CardDescription>Manage and monitor customer interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: '#12847', customer: 'Sarah Johnson', subject: 'Order tracking inquiry', bot: 'Website Support Bot', time: '2 min ago', status: 'resolved', satisfaction: 5 },
                      { id: '#12846', customer: 'Mike Chen', subject: 'Return policy question', bot: 'E-commerce Assistant', time: '5 min ago', status: 'active', satisfaction: null },
                      { id: '#12845', customer: 'Emma Davis', subject: 'Account access issue', bot: 'Website Support Bot', time: '12 min ago', status: 'escalated', satisfaction: 3 },
                      { id: '#12844', customer: 'John Smith', subject: 'Product availability', bot: 'E-commerce Assistant', time: '18 min ago', status: 'resolved', satisfaction: 4 },
                      { id: '#12843', customer: 'Lisa Wong', subject: 'Shipping information', bot: 'Order Tracking Bot', time: '25 min ago', status: 'resolved', satisfaction: 5 }
                    ].map((conv, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm font-medium">{conv.id}</p>
                            <p className="text-xs text-gray-500">{conv.time}</p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{conv.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{conv.customer}</p>
                            <p className="text-xs text-gray-500">{conv.subject}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {conv.bot}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          {conv.satisfaction && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">Rating:</span>
                              <span className="text-sm font-medium">{conv.satisfaction}/5</span>
                            </div>
                          )}
                          <Badge variant={conv.status === 'resolved' ? 'default' : conv.status === 'active' ? 'secondary' : 'destructive'}>
                            {conv.status}
                          </Badge>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'chatbots' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Chatbots</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Bot
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { 
                    name: 'Website Support Bot', 
                    description: 'Handles general customer inquiries on your website',
                    platform: 'Website',
                    conversations: 1247,
                    status: 'active',
                    lastUpdated: '2 hours ago'
                  },
                  { 
                    name: 'E-commerce Assistant', 
                    description: 'Helps customers with product questions and orders',
                    platform: 'Shopify',
                    conversations: 892,
                    status: 'active',
                    lastUpdated: '1 day ago'
                  },
                  { 
                    name: 'FAQ Bot', 
                    description: 'Answers frequently asked questions',
                    platform: 'Facebook',
                    conversations: 456,
                    status: 'paused',
                    lastUpdated: '3 days ago'
                  },
                  { 
                    name: 'Order Tracking Bot', 
                    description: 'Provides order status and shipping updates',
                    platform: 'WhatsApp',
                    conversations: 234,
                    status: 'active',
                    lastUpdated: '5 hours ago'
                  }
                ].map((bot, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bot className="h-5 w-5 text-blue-600" />
                        </div>
                        <Badge variant={bot.status === 'active' ? 'default' : 'secondary'}>
                          {bot.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                      <CardDescription>{bot.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Platform:</span>
                          <span className="font-medium">{bot.platform}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Conversations:</span>
                          <span className="font-medium">{bot.conversations.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Last Updated:</span>
                          <span className="font-medium">{bot.lastUpdated}</span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                          <Button variant="outline" size="sm" className="flex-1">Analytics</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab !== 'overview' && activeTab !== 'conversations' && activeTab !== 'chatbots' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

