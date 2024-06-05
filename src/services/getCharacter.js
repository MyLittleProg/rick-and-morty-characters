import $api from "@/api/http";

export default class CharacterService{
    static async fetchCharacters(id){
        return $api.get(`/character/${id}`)
    }
}