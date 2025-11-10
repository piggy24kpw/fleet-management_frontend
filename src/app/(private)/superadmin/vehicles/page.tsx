import VehicleListTemplate from "@/template/superadmin/vehicles/vehicle-list";

export default async function VehicleDetailsPage(){

  // var vehicles: Vehicle[] = []; 
  // try{
  //   const result = await getAllVehicle();
  //   vehicles = result;
  // }catch(error){
  //   console.error("Failed to fetch vehicles", error);
  // }
  return(
    <VehicleListTemplate></VehicleListTemplate>
    
  )
}