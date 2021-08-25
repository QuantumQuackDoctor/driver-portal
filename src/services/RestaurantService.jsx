import axios from "axios";

export default class RestaurantService {

}

export function getRestaurant(id) {
    return axios.get("/restaurants", {params: {id: id}});
}
