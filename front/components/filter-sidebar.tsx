import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface FilterSidebarProps {
  unit: "sqft" | "m2"
  setUnit: (unit: "sqft" | "m2") => void
}

export default function FilterSidebar({ unit, setUnit }: FilterSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <Card className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Unidad de Medida</h3>
            <RadioGroup
              value={unit}
              onValueChange={(value) => setUnit(value as "sqft" | "m2")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="m2" id="m2" />
                <Label htmlFor="m2">Metros Cuadrados (m²)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sqft" id="sqft" />
                <Label htmlFor="sqft">Pies Cuadrados (sq ft)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="font-medium mb-4">Rango de Precio</h3>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm">$0</span>
              <span className="text-sm">$1000</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Área</h3>
            <Slider
              defaultValue={[0, 500]}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm">0 {unit === "m2" ? "m²" : "sq ft"}</span>
              <span className="text-sm">500 {unit === "m2" ? "m²" : "sq ft"}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 