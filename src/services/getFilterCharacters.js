import $api from "@/api/http";

export default class FilterService{
    static async fetchFilterCharacters(name,status){
        return $api.get(`/character/?name=${name}&status=${status}`)
    }
}