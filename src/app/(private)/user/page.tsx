'use client'
import Navigation from "@/components/ui/navigation";
import VehicleCard from "@/components/ui/vehiclecard";

const mockVehicles = [
  {
    id: "1",
    name: "Toyota Camry 2023",
    type: "Sedan",
    capacity: 5,
    fuelType: "Hybrid",
    available: true,
  },
  {
    id: "2",
    name: "Honda CR-V 2024",
    type: "SUV",
    capacity: 7,
    fuelType: "Petrol",
    available: true,
  },
  {
    id: "3",
    name: "Ford Transit",
    type: "Van",
    capacity: 12,
    fuelType: "Diesel",
    available: false,
  },
  {
    id: "4",
    name: "Tesla Model 3",
    type: "Electric Sedan",
    capacity: 5,
    fuelType: "Electric",
    available: true,
  },
  {
    id: "5",
    name: "Mercedes Sprinter",
    type: "Minibus",
    capacity: 15,
    fuelType: "Diesel",
    available: true,
  },
  {
    id: "6",
    name: "BMW 5 Series",
    type: "Executive Sedan",
    capacity: 5,
    fuelType: "Petrol",
    available: false,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Vehicles</h1>
          <p className="text-muted-foreground">
            Select a vehicle to create a booking request for official use
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
