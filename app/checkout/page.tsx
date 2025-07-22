"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("mpesa")

  const cartItems = [
    {
      id: 1,
      name: "Jollof Rice",
      price: 450,
      quantity: 2,
    },
    {
      id: 2,
      name: "Egusi Soup",
      price: 550,
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 150
  const total = subtotal + deliveryFee

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery address</Label>
                <Textarea id="address" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Delivery instructions (optional)</Label>
                <Textarea id="notes" placeholder="Any special instructions for delivery" rows={2} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                    <div className="h-8 w-8 relative">
                      <Image src="/placeholder.svg?height=32&width=32" alt="MPesa" fill className="object-contain" />
                    </div>
                    <span>M-Pesa</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <div className="h-8 w-8 relative">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Credit Card"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                    <div className="h-8 w-8 relative">
                      <Image src="/placeholder.svg?height=32&width=32" alt="Cash" fill className="object-contain" />
                    </div>
                    <span>Cash on Delivery</span>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "mpesa" && (
                <div className="mt-4 p-4 border rounded-md bg-muted/30">
                  <h3 className="font-medium mb-2">M-Pesa Payment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You will receive an M-Pesa prompt on your phone to complete the payment.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                    <Input id="mpesa-number" placeholder="e.g. 07XX XXX XXX" />
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="mt-4 p-4 border rounded-md bg-muted/30">
                  <h3 className="font-medium mb-2">Card Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="XXX" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                  </span>
                  <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>KSh {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>KSh {deliveryFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">Place Order</Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/cart">Back to Cart</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
