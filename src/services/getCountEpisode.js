import $api from "@/api/http";

export default class CountEpisodesService{
    static async fetchCountEpisodes(){
        return $api.get(`/episode`)
    }
}