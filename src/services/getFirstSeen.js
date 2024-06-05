import $api from "@/api/http";

export default class FirstSeenService{
    static async fetchFirstSeen(url){
        return $api.get(`/${url}`)
    }
}