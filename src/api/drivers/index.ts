import { authAxios } from "..";
import routes from "../drivers/route";

const API = {
  all: () => authAxios.get<ResponseBody<Driver[]>>(routes.all),
  create: (driver: Driver) => authAxios.post(routes.create, driver),
  update: (driver: Driver) => authAxios.put(`${routes.update}${driver.id}`, driver)
};

export default API;
