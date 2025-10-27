import { authAxios } from "..";
import routes from "../vehicles/route";


const API = {
  all: () => authAxios.get<ResponseBody<Vehicle[]>>(routes.all),
  create: (vehicle: Vehicle) => authAxios.post(routes.create, vehicle),
  update: (vehicle: Vehicle) => authAxios.put(`${routes.update}${vehicle.id}`, vehicle)
};

export default API;
