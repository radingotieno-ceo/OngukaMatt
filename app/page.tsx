import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Star, MessageCircle, ChefHat } from "lucide-react"
import ChatbotButton from "@/components/chatbot-button"

export default function Home() {
  const features = [
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Authentic Cuisine",
      description: "Traditional African recipes prepared by expert chefs",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Hot meals delivered to your doorstep in under 45 minutes",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Top Rated",
      description: "Consistently rated 4.8+ stars by our customers",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat directly with your delivery person in real-time",
    },
  ]

  const popularDishes = [
    {
      name: "Jollof Rice",
      image: "/jollofrice.jpeg",
      description: "West African classic rice dish cooked with tomatoes and spices",
      price: "KSh 450",
    },
    {
      name: "Egusi Soup",
      image: "/egusisoup.jpeg",
      description: "Melon seed soup with vegetables and choice of protein",
      price: "KSh 550",
    },
    {
      name: "Injera with Doro Wat",
      image: "/injeradorowat.webp",
      description: "Ethiopian sourdough flatbread with spicy chicken stew",
      price: "KSh 600",
    },
    {
      name: "Mandazi",
      image: "/mandazis.jpg",
      description: "East African sweet, fluffy fried bread",
      price: "KSh 200",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "/johnson.webp",
      comment: "The Jollof Rice was absolutely delicious! Authentic flavors and generous portions. Will definitely order again.",
      rating: 5,
    },
    {
      name: "Michael Omondi",
      avatar: "/omondi.webp",
      comment: "Egusi Soup was very tasty and reminded me of home. Delivery was prompt and the food was still hot when it arrived.",
      rating: 4,
    },
    {
      name: "Amina Hassan",
      avatar: "/amina.webp",
      comment: "The Injera with Doro Wat was perfect! So hard to find authentic Ethiopian food, but OngukaMatt nailed it.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center bg-center bg-cover" style={{ backgroundImage: 'url(/jollofrice.jpeg)' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container flex flex-col items-center py-24 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6">Authentic African Cuisine<br />Delivered To Your Door</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow">
            Experience the rich flavors and traditions of Africa with our chef-crafted dishes, delivered hot and fresh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-lg animate-bounce" asChild>
              <Link href="/menu">Order Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-primary/80 hover:text-primary-foreground" asChild>
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose OngukaMatt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Dishes</h2>
            <Button variant="outline" asChild>
              <Link href="/menu">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDishes.map((dish, index) => (
              <Card key={index} className="overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
                <div className="aspect-video relative">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{dish.name}</h3>
                    <span className="font-bold text-primary">{dish.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">{dish.description}</p>
                  <Button className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image src={t.avatar} alt={t.name} width={56} height={56} className="rounded-full mb-4" />
                  <h3 className="font-medium mb-2">{t.name}</h3>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className={idx < t.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{t.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Working Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-medium mb-2">Monday - Friday</h3>
                  <p className="text-2xl font-bold">9:00 AM - 10:00 PM</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-medium mb-2">Saturday</h3>
                  <p className="text-2xl font-bold">10:00 AM - 10:00 PM</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-medium mb-2">Sunday</h3>
                  <p className="text-2xl font-bold">10:00 AM - 8:00 PM</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground">
              We deliver throughout the city during our working hours. Last orders are accepted 45 minutes before
              closing time.
            </p>
          </div>
        </div>
      </section>

      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  )
}
