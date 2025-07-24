"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { User, Award, Zap, Vote, Users, DollarSign } from 'lucide-react'

const achievements = [
  { id: 1, title: "Solar Pioneer", description: "First to install solar panels", earned: true, date: "2024-01-10" },
  { id: 2, title: "Community Voter", description: "Voted on 10+ proposals", earned: true, date: "2024-01-15" },
  { id: 3, title: "Energy Saver", description: "Reduced consumption by 20%", earned: false, progress: 75 },
  { id: 4, title: "Cooperative Leader", description: "Led 3 community initiatives", earned: false, progress: 33 },
]

const contributionHistory = [
  { type: "energy", description: "Sold 50 kWh to community grid", points: 25, date: "2024-01-15" },
  { type: "governance", description: "Voted on solar farm proposal", points: 5, date: "2024-01-14" },
  { type: "community", description: "Volunteered at community garden", points: 20, date: "2024-01-12" },
  { type: "finance", description: "Helped neighbor with loan application", points: 15, date: "2024-01-10" },
]

export function ProfileSettings() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState({
    energy: true,
    governance: true,
    housing: false,
    finance: true
  })

  const totalPoints = contributionHistory.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Badge variant="outline" className="text-sm">
          {totalPoints} Community Points
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={user?.username}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full mt-1 p-2 border rounded-md"
                    rows={3}
                    placeholder="Tell the community about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      placeholder="e.g., Solar installation, Gardening"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interests">Interests</Label>
                    <Input
                      id="interests"
                      placeholder="e.g., Renewable energy, Community organizing"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold">{user?.username}</h3>
                  <Badge variant="secondary">{user?.role}</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Level</span>
                      <span>Level 3</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      35 points to Level 4
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{totalPoints}</p>
                      <p className="text-xs text-muted-foreground">Total Points</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-muted-foreground">Contributions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your contributions to the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <Badge variant="secondary" className="mt-2">
                                Earned {achievement.date}
                              </Badge>
                            ) : (
                              <div className="mt-2">
                                <Progress value={achievement.progress} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">
                                  {achievement.progress}% complete
                                </p>
                              </div>
                            )}
                          </div>
                          <Award className={`h-6 w-6 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
              <CardDescription>Your recent contributions to the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contributionHistory.map((contribution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        contribution.type === 'energy' ? 'bg-yellow-100 text-yellow-600' :
                        contribution.type === 'governance' ? 'bg-purple-100 text-purple-600' :
                        contribution.type === 'community' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {contribution.type === 'energy' && <Zap className="h-4 w-4" />}
                        {contribution.type === 'governance' && <Vote className="h-4 w-4" />}
                        {contribution.type === 'community' && <Users className="h-4 w-4" />}
                        {contribution.type === 'finance' && <DollarSign className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{contribution.description}</p>
                        <p className="text-xs text-muted-foreground">{contribution.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">+{contribution.points} pts</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Energy Updates</p>
                  <p className="text-sm text-muted-foreground">Solar generation and trading notifications</p>
                </div>
                <Button
                  variant={notifications.energy ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotifications(prev => ({ ...prev, energy: !prev.energy }))}
                >
                  {notifications.energy ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Governance Alerts</p>
                  <p className="text-sm text-muted-foreground">New proposals and voting reminders</p>
                </div>
                <Button
                  variant={notifications.governance ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotifications(prev => ({ ...prev, governance: !prev.governance }))}
                >
                  {notifications.governance ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Housing Updates</p>
                  <p className="text-sm text-muted-foreground">Available units and maintenance updates</p>
                </div>
                <Button
                  variant={notifications.housing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotifications(prev => ({ ...prev, housing: !prev.housing }))}
                >
                  {notifications.housing ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Financial Alerts</p>
                  <p className="text-sm text-muted-foreground">Loan updates and payment reminders</p>
                </div>
                <Button
                  variant={notifications.finance ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotifications(prev => ({ ...prev, finance: !prev.finance }))}
                >
                  {notifications.finance ? "On" : "Off"}
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="mt-1" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
