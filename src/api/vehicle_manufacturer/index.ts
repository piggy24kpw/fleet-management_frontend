import { authAxios } from "..";
import routes from "../vehicle_manufacturer/route";


const API = {
  all: () => authAxios.get<ResponseBody<Vehicle_Manufacturer[]>>(routes.all),
  create: (vehicle_manufacturer: Vehicle_Manufacturer) => authAxios.post(routes.create, vehicle_manufacturer),
  update: (vehicle_manufacturer: Vehicle_Manufacturer) => authAxios.put(`${routes.update}${vehicle_manufacturer.id}`, vehicle_manufacturer)
};

export default API;
