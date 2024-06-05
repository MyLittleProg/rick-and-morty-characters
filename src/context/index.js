import { defineStore } from "pinia";

export const useMyStore = defineStore('myStore',{
    state:()=>({
        activeEpisode:{},
        idEpisode:1,
        activePage:1,
        nicknameCharacter:'',
        statusCharacter:'Alive'
    }),
    getters:{
        
    },
    actions:{
        changeActiveEpisode(episode){
            this.activeEpisode = episode
        },
        changeIdEpisode(id){
            this.idEpisode = id
        },
        changeActivePage(id){
            this.activePage = id
        },
        changeNickname(nickname){
            this.nicknameCharacter = nickname
        },
        changeStatus(status){
            this.statusCharacter = status
        }
    }
})