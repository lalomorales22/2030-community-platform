"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { DollarSign, TrendingUp, CreditCard, Coins, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react"

const accountData = {
  balance: 2450.75,
  creditScore: 742,
  totalLoans: 15000,
  totalSavings: 8500,
  communityBalance: 125.5,
}

const spendingData = [
  { name: "Housing", value: 1200, color: "#10B981" },
  { name: "Energy", value: 150, color: "#F59E0B" },
  { name: "Food", value: 400, color: "#3B82F6" },
  { name: "Transport", value: 200, color: "#8B5CF6" },
  { name: "Other", value: 300, color: "#EF4444" },
]

const transactionHistory = [
  { id: 1, type: "income", description: "Community dividend", amount: 125.5, date: "2024-01-15" },
  { id: 2, type: "expense", description: "Energy bill", amount: -45.2, date: "2024-01-14" },
  { id: 3, type: "income", description: "Solar energy sale", amount: 23.75, date: "2024-01-13" },
  { id: 4, type: "expense", description: "Housing payment", amount: -1200.0, date: "2024-01-01" },
]

const loanOffers = [
  { id: 1, type: "Home Improvement", amount: 5000, rate: 3.2, term: 24, purpose: "Solar panel installation" },
  { id: 2, type: "Education", amount: 2500, rate: 2.8, term: 12, purpose: "Skills development course" },
  { id: 3, type: "Emergency", amount: 1000, rate: 4.5, term: 6, purpose: "Unexpected expenses" },
]

export function FinanceHub() {
  const [selectedLoan, setSelectedLoan] = useState<any>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Financial Services Hub</h1>
        <Badge variant="outline" className="text-sm">
          Credit Score: {accountData.creditScore}
        </Badge>
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Balance</p>
                  <p className="text-2xl font-bold text-green-600">${accountData.balance.toLocaleString()}</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +5.2% this month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
                  <p className="text-2xl font-bold text-blue-600">{accountData.creditScore}</p>
                  <p className="text-xs text-blue-600">Excellent</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
                  <p className="text-2xl font-bold text-purple-600">${accountData.totalSavings.toLocaleString()}</p>
                  <p className="text-xs text-purple-600">Goal: $10,000</p>
                </div>
                <PiggyBank className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community Currency</p>
                  <p className="text-2xl font-bold text-orange-600">{accountData.communityBalance} CC</p>
                  <p className="text-xs text-orange-600">1 CC = $1.05</p>
                </div>
                <Coins className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="currency">Community Currency</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Your monthly spending categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {spendingData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">${item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Available Loan Options
              </CardTitle>
              <CardDescription>Community-backed loans with competitive rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanOffers.map((loan) => (
                  <Card key={loan.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{loan.type}</h4>
                          <Badge variant="secondary">{loan.rate}% APR</Badge>
                        </div>

                        <div>
                          <p className="text-2xl font-bold text-green-600">${loan.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{loan.term} month term</p>
                        </div>

                        <p className="text-sm">{loan.purpose}</p>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="w-full" onClick={() => setSelectedLoan(loan)}>
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Loan Application</DialogTitle>
                              <DialogDescription>
                                {loan.type} - ${loan.amount.toLocaleString()} at {loan.rate}% APR
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="purpose">Loan Purpose</Label>
                                <Input id="purpose" defaultValue={loan.purpose} className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="income">Monthly Income</Label>
                                <Input
                                  id="income"
                                  type="number"
                                  placeholder="Enter your monthly income"
                                  className="mt-1"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Loan Amount</Label>
                                  <p className="text-lg font-semibold">${loan.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <Label>Monthly Payment</Label>
                                  <p className="text-lg font-semibold">
                                    ${Math.round((loan.amount / loan.term) * (1 + loan.rate / 100))}
                                  </p>
                                </div>
                              </div>
                              <Button className="w-full">Submit Application</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Savings Goals
              </CardTitle>
              <CardDescription>Track your progress towards financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-muted-foreground">$5,000 / $6,000</span>
                  </div>
                  <Progress value={83} className="h-3" />
                  <p className="text-sm text-muted-foreground">$1,000 remaining to reach your goal</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Solar Panel Upgrade</span>
                    <span className="text-sm text-muted-foreground">$3,500 / $8,000</span>
                  </div>
                  <Progress value={44} className="h-3" />
                  <p className="text-sm text-muted-foreground">$4,500 remaining to reach your goal</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Community Investment</span>
                    <span className="text-sm text-muted-foreground">$2,000 / $3,000</span>
                  </div>
                  <Progress value={67} className="h-3" />
                  <p className="text-sm text-muted-foreground">$1,000 remaining to reach your goal</p>
                </div>

                <Button className="w-full">
                  <PiggyBank className="h-4 w-4 mr-2" />
                  Create New Savings Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Community Currency Exchange
              </CardTitle>
              <CardDescription>Trade and earn community currency for local transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Current Balance</h4>
                      <p className="text-3xl font-bold text-orange-600">{accountData.communityBalance} CC</p>
                      <p className="text-sm text-muted-foreground">
                        ≈ ${(accountData.communityBalance * 1.05).toFixed(2)} USD
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Exchange Rate</h4>
                      <p className="text-3xl font-bold text-green-600">$1.05</p>
                      <p className="text-sm text-muted-foreground">per 1 Community Coin</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Ways to Earn Community Currency</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Energy Contribution</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sell excess solar energy to the community grid
                      </p>
                      <Badge variant="secondary">+5 CC per kWh</Badge>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Community Service</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Volunteer for community projects and initiatives
                      </p>
                      <Badge variant="secondary">+10 CC per hour</Badge>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Governance Participation</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Vote on proposals and attend community meetings
                      </p>
                      <Badge variant="secondary">+2 CC per vote</Badge>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Skill Sharing</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Teach workshops or provide services to neighbors
                      </p>
                      <Badge variant="secondary">+15 CC per session</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Coins className="h-4 w-4 mr-2" />
                    Buy Community Currency
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Exchange to USD
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
