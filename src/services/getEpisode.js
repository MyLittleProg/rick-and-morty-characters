import $api from "@/api/http";

export default class EpisodesService{
    static async fetchEpisodes(id){
        return $api.get(`/episode/${id}`)
    }
}