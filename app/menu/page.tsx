import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ChatbotButton from "@/components/chatbot-button"

interface FoodItem {
  id: number
  name: string
  description: string
  price: string
  image: string
  available: boolean
  category: string
}

export default function MenuPage() {
  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: "Jollof Rice",
      description: "West African classic rice dish cooked with tomatoes and spices",
      price: "KSh 450",
      image: "/jollofrice.jpeg",
      available: true,
      category: "main",
    },
    {
      id: 2,
      name: "Egusi Soup",
      description: "Melon seed soup with vegetables and choice of protein",
      price: "KSh 550",
      image: "/egusisoup.jpeg",
      available: true,
      category: "main",
    },
    {
      id: 3,
      name: "Injera with Doro Wat",
      description: "Ethiopian sourdough flatbread with spicy chicken stew",
      price: "KSh 600",
      image: "/injeradorowat.webp",
      available: true,
      category: "main",
    },
    {
      id: 4,
      name: "Pounded Yam and Egusi",
      description: "Smooth pounded yam served with melon seed soup",
      price: "KSh 500",
      image: "/poundedyam.jpeg",
      available: false,
      category: "main",
    },
    {
      id: 5,
      name: "Suya",
      description: "Spicy skewered meat, a popular Nigerian street food",
      price: "KSh 350",
      image: "/suya.jpeg",
      available: true,
      category: "starter",
    },
    {
      id: 6,
      name: "Samosas",
      description: "Triangular pastries filled with spiced meat or vegetables",
      price: "KSh 250",
      image: "/samosas.jpeg",
      available: true,
      category: "starter",
    },
    {
      id: 7,
      name: "Mandazi",
      description: "East African sweet, fluffy fried bread",
      price: "KSh 200",
      image: "/mandazis.jpg",
      available: true,
      category: "dessert",
    },
    {
      id: 8,
      name: "Koeksisters",
      description: "South African syrup-coated twisted pastries",
      price: "KSh 300",
      image: "/koeksisters.jpg",
      available: true,
      category: "dessert",
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore our selection of authentic African dishes, prepared with traditional recipes and the freshest
          ingredients.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="main">Main Dishes</TabsTrigger>
            <TabsTrigger value="starter">Starters</TabsTrigger>
            <TabsTrigger value="dessert">Desserts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="main" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems
              .filter((item) => item.category === "main")
              .map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="starter" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems
              .filter((item) => item.category === "starter")
              .map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="dessert" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems
              .filter((item) => item.category === "dessert")
              .map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <ChatbotButton />
    </div>
  )
}

function FoodCard({ item }: { item: FoodItem }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg py-1.5">
              Currently Unavailable
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium">{item.name}</h3>
          <span className="font-medium text-primary">{item.price}</span>
        </div>
        <p className="text-muted-foreground mb-4">{item.description}</p>
        <Button className="w-full" disabled={!item.available}>
          {item.available ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )
}
