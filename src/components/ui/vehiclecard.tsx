import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  id: string;
  name: string;
  type: string;
  capacity: number;
  fuelType: string;
  available: boolean;
  imageUrl?: string;
}

const VehicleCard = ({ id, name, type, capacity, fuelType, available }: VehicleCardProps) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/new-booking?vehicle=${id}`);
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <Car className="h-24 w-24 text-primary/40" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <Badge variant={available ? "default" : "secondary"}>
            {available ? "Available" : "In Use"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{capacity} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{fuelType}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleBook} 
          disabled={!available} 
          className="w-full"
        >
          Book Vehicle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
