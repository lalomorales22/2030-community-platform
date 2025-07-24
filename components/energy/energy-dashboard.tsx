"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Sun, Battery, Zap, TrendingUp, ArrowUpDown, Leaf } from "lucide-react"

const energyData = [
  { time: "00:00", solar: 0, consumption: 45, battery: 87 },
  { time: "06:00", solar: 12, consumption: 52, battery: 82 },
  { time: "12:00", solar: 89, consumption: 67, battery: 95 },
  { time: "18:00", solar: 34, consumption: 78, battery: 88 },
  { time: "24:00", solar: 0, consumption: 41, battery: 85 },
]

const tradingData = [
  { id: 1, seller: "Solar Farm A", amount: 50, price: 0.12, status: "active" },
  { id: 2, seller: "Community Pool", amount: 25, price: 0.1, status: "pending" },
  { id: 3, seller: "Residential Block B", amount: 15, price: 0.11, status: "completed" },
]

export function EnergyDashboard() {
  const [currentGeneration, setCurrentGeneration] = useState(2.4)
  const [batteryLevel, setBatteryLevel] = useState(87)
  const [carbonOffset, setCarbonOffset] = useState(1.2)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Energy Management</h1>
        <Badge variant="outline" className="text-sm">
          Real-time Data
        </Badge>
      </div>

      {/* Energy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="pulse-green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Generation</p>
                  <p className="text-3xl font-bold text-green-600">{currentGeneration} MWh</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +15% from average
                  </p>
                </div>
                <Sun className="h-12 w-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Battery Storage</p>
                  <p className="text-3xl font-bold text-blue-600">{batteryLevel}%</p>
                  <Progress value={batteryLevel} className="mt-2 h-2" />
                </div>
                <Battery className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Carbon Offset</p>
                  <p className="text-3xl font-bold text-emerald-600">{carbonOffset} tons</p>
                  <p className="text-xs text-emerald-600">Today</p>
                </div>
                <Leaf className="h-12 w-12 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trading">Energy Trading</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Energy Flow</CardTitle>
              <CardDescription>Real-time solar generation, consumption, and battery levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stackId="2"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Energy Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Residential</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Commercial</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Community Services</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Grid Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Grid Connection</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Stable
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Load Balancing</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Predictive AI</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Backup</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Ready
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5" />
                Energy Trading Marketplace
              </CardTitle>
              <CardDescription>Buy and sell excess energy with community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradingData.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{trade.seller}</p>
                      <p className="text-sm text-muted-foreground">{trade.amount} kWh available</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${trade.price}/kWh</p>
                      <Badge
                        variant={
                          trade.status === "active" ? "default" : trade.status === "completed" ? "secondary" : "outline"
                        }
                      >
                        {trade.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      {trade.status === "active" ? "Buy" : "View"}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Create Energy Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Analytics</CardTitle>
              <CardDescription>Detailed insights into community energy patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="solar" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="consumption" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="battery" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
