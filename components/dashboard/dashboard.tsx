"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useWebSocket } from "@/contexts/websocket-context"
import {
  Home,
  Zap,
  Building,
  DollarSign,
  Vote,
  Bot,
  User,
  Sun,
  Battery,
  Users,
  TrendingUp,
  Leaf,
  LogOut,
} from "lucide-react"
import { EnergyDashboard } from "@/components/energy/energy-dashboard"
import { HousingPortal } from "@/components/housing/housing-portal"
import { FinanceHub } from "@/components/finance/finance-hub"
import { GovernanceCenter } from "@/components/governance/governance-center"
import { AIAssistant } from "@/components/ai/ai-assistant"
import { ProfileSettings } from "@/components/profile/profile-settings"

const navigation = [
  { name: "Dashboard", icon: Home, id: "dashboard" },
  { name: "Energy", icon: Zap, id: "energy" },
  { name: "Housing", icon: Building, id: "housing" },
  { name: "Finance", icon: DollarSign, id: "finance" },
  { name: "Governance", icon: Vote, id: "governance" },
  { name: "AI Assistant", icon: Bot, id: "ai" },
  { name: "Profile", icon: User, id: "profile" },
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [communityData, setCommunityData] = useState<any>(null)
  const { user, logout } = useAuth()
  const { connected } = useWebSocket()

  useEffect(() => {
    // Fetch community data
    const fetchCommunityData = async () => {
      try {
        const response = await fetch("/api/communities/1", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        const data = await response.json()
        setCommunityData(data)
      } catch (error) {
        console.error("Failed to fetch community data:", error)
      }
    }

    fetchCommunityData()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "energy":
        return <EnergyDashboard />
      case "housing":
        return <HousingPortal />
      case "finance":
        return <FinanceHub />
      case "governance":
        return <GovernanceCenter />
      case "ai":
        return <AIAssistant />
      case "profile":
        return <ProfileSettings />
      default:
        return <DashboardHome communityData={communityData} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">2030</h2>
                <p className="text-xs text-muted-foreground">{connected ? "Connected" : "Offline"}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveTab(item.id)} isActive={activeTab === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Welcome back, {user?.username}</span>
              <Badge variant="secondary" className="ml-auto">
                {user?.role}
              </Badge>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function DashboardHome({ communityData }: { communityData: any }) {
  const [metrics, setMetrics] = useState({
    energySelfSufficiency: 87,
    housingAffordability: 92,
    financialInclusion: 78,
    governanceParticipation: 65,
    overallHealth: 81,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Community Dashboard</h1>
        <Badge variant="outline" className="text-sm">
          {communityData?.name || "Loading..."}
        </Badge>
      </div>

      {/* Community Health Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Community Health Score
            </CardTitle>
            <CardDescription>Overall wellbeing of our cooperative community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${metrics.overallHealth}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-500">{metrics.overallHealth}%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Energy Self-Sufficiency</span>
                  <span>{metrics.energySelfSufficiency}%</span>
                </div>
                <Progress value={metrics.energySelfSufficiency} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Housing Affordability</span>
                  <span>{metrics.housingAffordability}%</span>
                </div>
                <Progress value={metrics.housingAffordability} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Financial Inclusion</span>
                  <span>{metrics.financialInclusion}%</span>
                </div>
                <Progress value={metrics.financialInclusion} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Governance Participation</span>
                  <span>{metrics.governanceParticipation}%</span>
                </div>
                <Progress value={metrics.governanceParticipation} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Solar Generation</p>
                  <p className="text-2xl font-bold">2.4 MWh</p>
                  <p className="text-xs text-green-600">+12% from yesterday</p>
                </div>
                <Sun className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Battery Storage</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-blue-600">Optimal level</p>
                </div>
                <Battery className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-green-600">+3 this week</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Proposals</p>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-orange-600">2 ending soon</p>
                </div>
                <Vote className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Community Activity</CardTitle>
            <CardDescription>Latest updates from your cooperative community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New solar panel installation completed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Housing proposal #23 passed with 89% approval</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Community currency exchange rate updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
