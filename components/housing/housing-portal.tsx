"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Home, MapPin, Wrench, Users, Star, Filter } from "lucide-react"

const housingUnits = [
  {
    id: 1,
    address: "123 Solar Street",
    type: "2BR Apartment",
    sqft: 850,
    cost: 1200,
    efficiency: "A+",
    available: true,
    features: ["Smart thermostat", "Solar panels", "EV charging"],
    rating: 4.8,
  },
  {
    id: 2,
    address: "456 Wind Avenue",
    type: "1BR Studio",
    sqft: 600,
    cost: 900,
    efficiency: "A",
    available: true,
    features: ["Smart lighting", "Energy monitoring", "Shared garden"],
    rating: 4.6,
  },
  {
    id: 3,
    address: "789 Green Lane",
    type: "3BR House",
    sqft: 1200,
    cost: 1800,
    efficiency: "A+",
    available: false,
    features: ["Full solar array", "Battery storage", "Smart home system"],
    rating: 4.9,
  },
]

const maintenanceRequests = [
  { id: 1, unit: "123 Solar Street", issue: "HVAC maintenance", priority: "medium", status: "in-progress" },
  { id: 2, unit: "456 Wind Avenue", issue: "Solar panel cleaning", priority: "low", status: "scheduled" },
  { id: 3, unit: "789 Green Lane", issue: "Smart lock repair", priority: "high", status: "pending" },
]

export function HousingPortal() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUnit, setSelectedUnit] = useState<any>(null)

  const filteredUnits = housingUnits.filter(
    (unit) =>
      unit.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Housing Portal</h1>
        <Badge variant="outline" className="text-sm">
          {housingUnits.filter((u) => u.available).length} Available Units
        </Badge>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Units</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="planning">Community Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Available Housing Units
              </CardTitle>
              <CardDescription>Find your perfect home in our sustainable community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by address or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUnits.map((unit) => (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-lg ${!unit.available ? "opacity-60" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                          <Home className="h-12 w-12 text-green-600" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{unit.address}</h3>
                            <Badge variant={unit.available ? "default" : "secondary"}>
                              {unit.available ? "Available" : "Occupied"}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">{unit.type}</p>

                          <div className="flex items-center justify-between text-sm">
                            <span>{unit.sqft} sq ft</span>
                            <span className="font-medium">${unit.cost}/month</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              Efficiency: {unit.efficiency}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{unit.rating}</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="w-full"
                                  disabled={!unit.available}
                                  onClick={() => setSelectedUnit(unit)}
                                >
                                  {unit.available ? "View Details" : "View Info"}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{unit.address}</DialogTitle>
                                  <DialogDescription>
                                    {unit.type} • {unit.sqft} sq ft • ${unit.cost}/month
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                                    <Home className="h-16 w-16 text-green-600" />
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Smart Features</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {unit.features.map((feature, index) => (
                                        <Badge key={index} variant="secondary">
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Energy Efficiency</p>
                                      <p className="text-2xl font-bold text-green-600">{unit.efficiency}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Community Rating</p>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-lg font-bold">{unit.rating}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {unit.available && <Button className="w-full">Apply for Housing</Button>}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance Requests
              </CardTitle>
              <CardDescription>Track and manage community maintenance needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{request.issue}</p>
                      <p className="text-sm text-muted-foreground">
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {request.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          request.priority === "high"
                            ? "destructive"
                            : request.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {request.priority}
                      </Badge>
                      <Badge variant="outline">{request.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full">
                  <Wrench className="h-4 w-4 mr-2" />
                  Submit Maintenance Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Planning
              </CardTitle>
              <CardDescription>Participate in shaping our community's future</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">New Development Project</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Proposed 20-unit eco-friendly housing complex with integrated solar and community gardens.
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">In Planning</Badge>
                        <Button size="sm" variant="outline">
                          View Plans
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Community Center Expansion</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Adding co-working spaces, maker lab, and childcare facilities to serve growing community.
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="default">Active Vote</Badge>
                        <Button size="sm" variant="outline">
                          Vote Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Interactive Community Map</h4>
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive map coming soon</p>
                      <p className="text-sm text-gray-400">Drag and drop planning tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
