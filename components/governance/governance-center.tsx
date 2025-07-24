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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Vote, Users, MessageSquare, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

const activeProposals = [
  {
    id: 1,
    title: "Community Solar Farm Expansion",
    description:
      "Proposal to expand our solar capacity by 50% with a new solar farm on the east side of the community.",
    type: "infrastructure",
    proposedBy: "Energy Committee",
    deadline: "2024-01-20",
    yesVotes: 156,
    noVotes: 23,
    abstainVotes: 12,
    totalVoters: 247,
    status: "active",
    impact: "high",
  },
  {
    id: 2,
    title: "Community Currency Interest Rate",
    description: "Adjust the community currency savings interest rate from 2.5% to 3.0% annually.",
    type: "policy",
    proposedBy: "Finance Committee",
    deadline: "2024-01-18",
    yesVotes: 89,
    noVotes: 45,
    abstainVotes: 8,
    totalVoters: 247,
    status: "active",
    impact: "medium",
  },
  {
    id: 3,
    title: "New Community Garden Space",
    description: "Allocate budget for a new community garden with greenhouse facilities.",
    type: "budget",
    proposedBy: "Sarah Chen",
    deadline: "2024-01-25",
    yesVotes: 67,
    noVotes: 12,
    abstainVotes: 5,
    totalVoters: 247,
    status: "active",
    impact: "low",
  },
]

const pastProposals = [
  {
    id: 4,
    title: "EV Charging Station Installation",
    status: "passed",
    finalVotes: { yes: 178, no: 34, abstain: 15 },
    implementationDate: "2024-02-01",
  },
  {
    id: 5,
    title: "Community Center Hours Extension",
    status: "rejected",
    finalVotes: { yes: 89, no: 134, abstain: 24 },
    implementationDate: null,
  },
]

export function GovernanceCenter() {
  const [selectedProposal, setSelectedProposal] = useState<any>(null)
  const [userVotes, setUserVotes] = useState<{ [key: number]: string }>({})

  const handleVote = (proposalId: number, vote: string) => {
    setUserVotes((prev) => ({ ...prev, [proposalId]: vote }))
    // In a real app, this would make an API call
  }

  const getVotePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Governance Center</h1>
        <Badge variant="outline" className="text-sm">
          {activeProposals.length} Active Proposals
        </Badge>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="history">Voting History</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="create">Create Proposal</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="space-y-4">
            {activeProposals.map((proposal, index) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            <Badge
                              variant={
                                proposal.impact === "high"
                                  ? "destructive"
                                  : proposal.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {proposal.impact} impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Proposed by {proposal.proposedBy}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">
                            {proposal.type}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            Ends {proposal.deadline}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm">{proposal.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Yes ({proposal.yesVotes})</span>
                          <span>
                            {getVotePercentage(
                              proposal.yesVotes,
                              proposal.yesVotes + proposal.noVotes + proposal.abstainVotes,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={getVotePercentage(
                            proposal.yesVotes,
                            proposal.yesVotes + proposal.noVotes + proposal.abstainVotes,
                          )}
                          className="h-2"
                        />

                        <div className="flex items-center justify-between text-sm">
                          <span>No ({proposal.noVotes})</span>
                          <span>
                            {getVotePercentage(
                              proposal.noVotes,
                              proposal.yesVotes + proposal.noVotes + proposal.abstainVotes,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={getVotePercentage(
                            proposal.noVotes,
                            proposal.yesVotes + proposal.noVotes + proposal.abstainVotes,
                          )}
                          className="h-2"
                        />

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            Participation:{" "}
                            {Math.round(
                              ((proposal.yesVotes + proposal.noVotes + proposal.abstainVotes) / proposal.totalVoters) *
                                100,
                            )}
                            %
                          </span>
                          <span>
                            {proposal.yesVotes + proposal.noVotes + proposal.abstainVotes} / {proposal.totalVoters}{" "}
                            voted
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedProposal(proposal)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{proposal.title}</DialogTitle>
                              <DialogDescription>
                                Proposed by {proposal.proposedBy} • Voting ends {proposal.deadline}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-sm">{proposal.description}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Current Results</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Yes</span>
                                    <span>{proposal.yesVotes} votes</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>No</span>
                                    <span>{proposal.noVotes} votes</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Abstain</span>
                                    <span>{proposal.abstainVotes} votes</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Impact Assessment</h4>
                                <Badge
                                  variant={
                                    proposal.impact === "high"
                                      ? "destructive"
                                      : proposal.impact === "medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {proposal.impact} impact
                                </Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {!userVotes[proposal.id] ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleVote(proposal.id, "yes")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Yes
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleVote(proposal.id, "no")}>
                              <XCircle className="h-4 w-4 mr-1" />
                              No
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleVote(proposal.id, "abstain")}>
                              <Clock className="h-4 w-4 mr-1" />
                              Abstain
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="secondary">You voted: {userVotes[proposal.id]}</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voting History</CardTitle>
              <CardDescription>Past proposals and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastProposals.map((proposal) => (
                  <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{proposal.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Yes: {proposal.finalVotes.yes} | No: {proposal.finalVotes.no} | Abstain:{" "}
                        {proposal.finalVotes.abstain}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={proposal.status === "passed" ? "default" : "destructive"}>
                        {proposal.status}
                      </Badge>
                      {proposal.implementationDate && (
                        <p className="text-xs text-muted-foreground mt-1">Implemented: {proposal.implementationDate}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Community Discussions
              </CardTitle>
              <CardDescription>Join the conversation about community matters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Solar Farm Discussion</p>
                      <p className="text-sm text-muted-foreground">
                        Community members discussing the environmental impact of the proposed solar farm expansion.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>23 replies</span>
                        <span>Last activity: 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Community Currency Benefits</p>
                      <p className="text-sm text-muted-foreground">
                        Exploring the advantages of increasing the community currency interest rate.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>15 replies</span>
                        <span>Last activity: 5 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Proposal</CardTitle>
              <CardDescription>Submit a proposal for community consideration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Proposal Title</Label>
                  <Input id="title" placeholder="Enter a clear, descriptive title" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="type">Proposal Type</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option value="budget">Budget</option>
                    <option value="policy">Policy</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your proposal, including rationale and expected outcomes"
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="impact">Expected Impact</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option value="low">Low Impact</option>
                    <option value="medium">Medium Impact</option>
                    <option value="high">High Impact</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="deadline">Voting Deadline</Label>
                  <Input id="deadline" type="date" className="mt-1" />
                </div>

                <Button className="w-full">
                  <Vote className="h-4 w-4 mr-2" />
                  Submit Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
