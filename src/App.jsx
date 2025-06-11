import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Bot, MessageSquare, BarChart3, Settings, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dashboard } from '@/components/Dashboard.jsx'
import { ChatDemo } from '@/components/ChatDemo.jsx'
import './App.css'

// API configuration - now using production backend URL
const API_BASE_URL = 'https://lnh8imcdy799.manus.space/api'

// Landing Page Component
function LandingPage() {
  const [chatbots, setChatbots] = useState([])
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    // Fetch real data from API
    fetchChatbots()
    fetchAnalytics()
  }, [])

  const fetchChatbots = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbots`)
      const data = await response.json()
      if (data.success) {
        setChatbots(data.data)
      }
    } catch (error) {
      console.error('Error fetching chatbots:', error)
      // Fallback data for demo
      setChatbots([
        {
          id: 1,
          name: 'Website Support Bot',
          description: 'Handles general customer inquiries on your website',
          platform: 'Website',
          status: 'active'
        },
        {
          id: 2,
          name: 'E-commerce Assistant',
          description: 'Helps customers with product questions and orders',
          platform: 'Shopify',
          status: 'active'
        }
      ])
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/dashboard`)
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      // Fallback data for demo
      setAnalytics({
        total_conversations: 2847,
        resolution_rate: 87,
        avg_response_time: 1.2,
        customer_satisfaction: 4.8
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">ChatBot Pro</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">Features</a>
              <a href="#demo" className="text-gray-500 hover:text-gray-900 transition-colors">Demo</a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Link to="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Customer Support
            <span className="text-blue-600 block">That Actually Works</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your customer service with intelligent chatbots designed specifically for small businesses. 
            Reduce response times, increase satisfaction, and scale your support effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Try Live Demo
              </Button>
            </a>
          </div>
          <div className="mt-12">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ✨ No credit card required • 14-day free trial
            </Badge>
          </div>
          
          {/* Live Stats */}
          {analytics && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analytics.total_conversations || 2847}</div>
                <div className="text-sm text-gray-600">Conversations Handled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analytics.resolution_rate || 87}%</div>
                <div className="text-sm text-gray-600">Resolution Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{analytics.avg_response_time || 1.2}s</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{analytics.customer_satisfaction || 4.8}/5</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to automate customer support
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for small businesses, ChatBot Pro combines enterprise-grade AI 
              with the simplicity you need to get started in minutes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Intelligent Conversations</CardTitle>
                <CardDescription>
                  Advanced AI understands context and provides relevant responses to customer inquiries
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Easy Setup</CardTitle>
                <CardDescription>
                  Get your chatbot running in under 30 minutes with our drag-and-drop conversation builder
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Track performance, customer satisfaction, and identify areas for improvement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle>Multi-channel Support</CardTitle>
                <CardDescription>
                  Deploy across your website, Facebook Messenger, WhatsApp, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Seamless Integrations</CardTitle>
                <CardDescription>
                  Connect with Shopify, WordPress, CRM systems, and 50+ popular business tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bot className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>24/7 Availability</CardTitle>
                <CardDescription>
                  Never miss a customer inquiry with round-the-clock automated support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Try ChatBot Pro Live
            </h2>
            <p className="text-lg text-gray-600">
              Experience our AI-powered chatbot in action. Ask any question and see how it responds!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ChatDemo chatbots={chatbots} />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your business size and needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-xl">Free</CardTitle>
                <div className="text-3xl font-bold">$0<span className="text-lg font-normal text-gray-600">/month</span></div>
                <CardDescription>Perfect for trying out ChatBot Pro</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Up to 100 conversations/month
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Basic chatbot features
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Email support
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="w-full" variant="outline">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="relative border-blue-500 border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-lg font-normal text-gray-600">/month</span></div>
                <CardDescription>Great for small businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Up to 1,000 conversations/month
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Advanced AI features
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Priority email support
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-xl">Professional</CardTitle>
                <div className="text-3xl font-bold">$99<span className="text-lg font-normal text-gray-600">/month</span></div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Up to 5,000 conversations/month
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Advanced analytics & reports
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Phone & email support
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="w-full" variant="outline">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your customer support?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using ChatBot Pro to provide better customer experiences.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Bot className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-lg font-bold">ChatBot Pro</span>
              </div>
              <p className="text-gray-400">
                AI-powered customer support platform designed for small businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ChatBot Pro. All rights reserved. Built with ❤️ in Mauritius.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App

