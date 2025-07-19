import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PlanGridProps {
  unit: "sqft" | "m2"
}

export default function PlanGrid({ unit }: PlanGridProps) {
  const plans = [
    {
      id: 1,
      title: "Casa Moderna",
      description: "Diseño contemporáneo con espacios abiertos",
      area: 150,
      price: 299,
      image: "/placeholder.jpg"
    },
    // Add more plans as needed
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src={plan.image}
            alt={plan.title}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription>
              {plan.area} {unit === "m2" ? "m²" : "sq ft"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{plan.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-xl font-bold">${plan.price}</span>
            <Button>Ver Detalles</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 