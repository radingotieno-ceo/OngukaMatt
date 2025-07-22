"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"
import ChatbotButton from "@/components/chatbot-button"

interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  dish: string
}

export default function ReviewsPage() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "May 10, 2025",
      comment:
        "The Jollof Rice was absolutely delicious! Authentic flavors and generous portions. Will definitely order again.",
      dish: "Jollof Rice",
    },
    {
      id: 2,
      name: "Michael Omondi",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "May 8, 2025",
      comment:
        "Egusi Soup was very tasty and reminded me of home. Delivery was prompt and the food was still hot when it arrived.",
      dish: "Egusi Soup",
    },
    {
      id: 3,
      name: "Amina Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "May 5, 2025",
      comment: "The Injera with Doro Wat was perfect! So hard to find authentic Ethiopian food, but OngukaMatt nailed it.",
      dish: "Injera with Doro Wat",
    },
    {
      id: 4,
      name: "David Mwangi",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      date: "May 3, 2025",
      comment:
        "The food was good but delivery took longer than expected. Would appreciate more accurate delivery time estimates.",
      dish: "Suya",
    },
  ])

  const handleSubmitReview = () => {
    if (rating === 0 || !comment.trim()) return

    const newReview: Review = {
      id: reviews.length + 1,
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      rating,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      comment,
      dish: "Recent Order",
    }

    setReviews([newReview, ...reviews])
    setRating(0)
    setComment("")
  }

  const averageRating = reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Rating Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <div key={star} className="flex items-center gap-2">
                    <div className="flex items-center w-12">
                      <span>{star}</span>
                      <StarIcon className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${(ratingCounts[index] / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm text-muted-foreground">{ratingCounts[index]}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 font-medium">Your Rating</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-medium">Your Review</label>
                <Textarea
                  placeholder="Share your experience with our food and service..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button onClick={handleSubmitReview} disabled={rating === 0 || !comment.trim()} className="w-full">
                Submit Review
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            {reviews.map((review: { name: string; rating: number; date: string; comment: string; dish: string }, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={"/placeholder.svg"} alt={review.name} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.dish}</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="mt-3">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ChatbotButton />
    </div>
  )
}
