'use client'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Zap, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Upload,
  Mail,
  FileSpreadsheet,
  Users,
  Building,
  Star,
  TrendingUp,
  Globe,
  Lock,
  Sparkles,
  BarChart3,
  FileText,
  Brain,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  
  // Test change - deployment verification

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Processing",
      description: "Advanced machine learning algorithms extract data with 99.5% accuracy",
      gradient: "from-purple-600 to-pink-600",
      stats: "99.5% Accuracy"
    },
    {
      icon: Upload,
      title: "Multi-Format Support",
      description: "Upload PDF, EML, TXT, and image files with drag-and-drop simplicity",
      gradient: "from-blue-600 to-cyan-600",
      stats: "10+ Formats"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process hundreds of POs in minutes, not hours",
      gradient: "from-orange-600 to-red-600",
      stats: "< 2 Seconds"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption with SOC 2 Type II compliance",
      gradient: "from-green-600 to-emerald-600",
      stats: "256-bit SSL"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track spending patterns and vendor performance instantly",
      gradient: "from-indigo-600 to-purple-600",
      stats: "Live Dashboard"
    },
    {
      icon: Globe,
      title: "Global Integration",
      description: "Connect with your existing ERP and accounting systems",
      gradient: "from-teal-600 to-blue-600",
      stats: "50+ Integrations"
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "₹299",
      period: "/month",
      credits: 10,
      description: "Perfect for small businesses getting started",
      features: [
        "10 PO processing credits monthly",
        "Email notifications",
        "Google Sheets export",
        "Basic support via email",
        "6 months data retention",
        "Standard processing speed"
      ],
      popular: false,
      icon: Users,
      gradient: "from-gray-600 to-gray-700",
      bgGradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Professional",
      price: "₹999",
      period: "/month",
      credits: 100,
      description: "Ideal for growing businesses with higher volume",
      features: [
        "100 PO processing credits monthly",
        "Priority email & chat support",
        "Advanced analytics dashboard",
        "Custom reporting templates",
        "2 years data retention",
        "Priority processing (under 1 second)",
        "API access for integrations"
      ],
      popular: true,
      icon: Building,
      gradient: "from-blue-600 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      credits: "Unlimited",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited PO processing",
        "Dedicated account manager",
        "Custom AI model training",
        "White-label solutions",
        "Unlimited data retention",
        "Sub-second processing guarantee",
        "Full API & webhook access",
        "On-premise deployment option"
      ],
      popular: false,
      icon: Rocket,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
    }
  ]

  const stats = [
    { 
      number: "50,000+", 
      label: "POs Processed", 
      icon: FileText,
      color: "text-blue-600"
    },
    { 
      number: "1,200+", 
      label: "Happy Customers", 
      icon: Users,
      color: "text-green-600"
    },
    { 
      number: "99.9%", 
      label: "Uptime", 
      icon: Shield,
      color: "text-purple-600"
    },
    { 
      number: "< 1s", 
      label: "Avg Processing", 
      icon: Zap,
      color: "text-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group cursor-pointer">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TradeFlow AI</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Testimonials</a>
              <Link href="/integrations" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Integrations</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover:bg-blue-50 transition-colors duration-200">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">🚀 AI-Powered PO Processing Revolution</span>
              <Badge className="bg-blue-600 text-white ml-2">NEW</Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Purchase Orders</span>
              Into Actionable Data
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stop wasting hours on manual data entry. Our AI processes thousands of POs with 
              <span className="font-semibold text-blue-600"> 99.5% accuracy</span> in 
              <span className="font-semibold text-purple-600"> under 1 second</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 group">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-2 hover:bg-blue-50 transition-all duration-300 group">
                <Link href="/login">
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Watch 2-Min Demo
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Setup in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of businesses transforming their PO processing
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${stat.color} bg-gradient-to-br from-white to-gray-50`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
              ✨ Cutting-Edge Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Supercharge Your Workflow</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform handles the entire PO processing workflow, 
              from upload to structured data export with unmatched accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br ${feature.bgGradient || 'from-gray-50 to-white'} group`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </CardTitle>
                  <div className="inline-flex items-center justify-center px-3 py-1 bg-white/80 backdrop-blur rounded-full text-sm font-semibold text-gray-700 mb-3">
                    {feature.stats}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🚀 Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How TradeFlow AI
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works in 3 Steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              Transform your PO workflow from hours to minutes with our simple 3-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 -z-10"></div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                  <Upload className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Upload Files</h3>
              <p className="text-gray-600 leading-relaxed">
                Drag and drop your PO files (PDF, EML, TXT, images) or upload from any device. 
                Support for batch processing of multiple files.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Processing</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI extracts vendor details, line items, amounts, and validates data 
                with 99.5% accuracy in under 1 second.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                  <FileSpreadsheet className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Export Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Get structured data exported to Google Sheets, Excel, CSV, or your existing ERP 
                system with real-time sync capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              💰 Flexible Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pricing Plans</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business. No hidden fees, no surprises. 
              Start free and scale as you grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br ${plan.bgGradient} ${
                  plan.popular ? 'scale-105 ring-4 ring-blue-500/20' : ''
                }`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 MOST POPULAR
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transform ${hoveredPlan === index ? 'scale-110 rotate-6' : ''} transition-all duration-300 shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-6 text-lg">
                    {plan.description}
                  </CardDescription>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {plan.credits} credits included
                  </p>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full text-lg py-3 transform transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105' 
                        : 'bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                    asChild
                  >
                    <Link href="/signup">
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/20 backdrop-blur-sm border border-white/30">
            🎯 Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block">PO Processing Forever?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 1,200+ businesses already saving 20+ hours per week and reducing errors by 95% with TradeFlow AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" variant="secondary" asChild className="text-lg px-10 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <Link href="/signup">
                Start Your 14-Day Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
              <Link href="/login">
                Schedule Live Demo
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6 group cursor-pointer">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TradeFlow AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                AI-powered purchase order processing for modern businesses. 
                Save time, reduce errors, and accelerate your workflow.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-blue-400 transition-colors duration-200">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors duration-200">Pricing</a></li>
                <li><a href="/login" className="hover:text-blue-400 transition-colors duration-200">Live Demo</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">API Docs</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Status Page</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Community</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Video Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#about" className="hover:text-blue-400 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2024 TradeFlow AI. All rights reserved. Made with ❤️ for businesses worldwide.
              </p>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm">SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">GDPR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
