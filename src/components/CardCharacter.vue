<template>
    <div class="container">
        <div class="card" v-for="character in Characters" :key="character.id">

            <img :src="character.image" alt="photo" width="190" class="card__photo">

            <div class="sections">

                <section class="status-name">
                    <h2>{{ character.name }}</h2>

                    <div class="status-name__status">
                        <span v-if="character.status == 'Alive'" class="status-name__status-alive"></span>
                        <span v-if="character.status == 'Dead'" class="status-name__status-dead"></span>
                        <span v-if="character.status == 'unknown'" class="status-name__status-unknown"></span>
                        &nbsp;&nbsp;
                        <p>{{character.status}}</p>
                        <span>-</span>
                        <p>{{character.species}}</p>
                    </div>
                </section>

                <section class="last-location">
                    <span>Last known location:</span>
                    <p>{{ character.location.name }}</p>
                </section>
                <section class="first-seen">
                    <span>First seen in:</span>
                    <p>{{ character.FirstSeen }}</p>
                </section>

            </div>

        </div>
    </div>
    
</template>

<script setup>
/* eslint-disable */
import { useMyStore } from '@/context';
import CharacterService from '@/services/getCharacter';
import EpisodesService from '@/services/getEpisode';
import { onMounted, ref, watch } from 'vue';
const store = useMyStore()

let idCharacters = ref([])
let Characters = ref([])
let AllCharacters = ref([])

const props = defineProps({
    episode:{
        type:Object,
        required:true
    },
    filter:{
        type:Object,
        required:false
    }
})


async function getFirstSeenName(urlid){
    const responce = await EpisodesService.fetchEpisodes(urlid)
    return responce
}

function getIdCharacter(arr){
    if(idCharacters.value.length > 1){
        idCharacters.value = []
    }
     arr.forEach((el)=>{
        idCharacters.value.push(el.slice(42))
     })
}
watch(()=>Characters.value,()=>{
    Characters.value.forEach((el)=>{
        getFirstSeenName(el.episode[0].slice(40)).then(element=> el.FirstSeen = element.data.name)
    })
})

watch(()=>props.filter,()=>{
    Characters.value = props.filter.results
})

watch(()=>props.episode,()=>{
    getIdCharacter(props.episode.characters)
    getCharacters(idCharacters.value.join(',')).then(el=>{
        Characters.value = el.data.filter((value,index)=> index < 6);
        AllCharacters.value = el.data;
    })
})

watch(()=>store.activePage,()=>{
    Characters.value = []
    let end = store.activePage * 6
    let start = end - 6
    for(let i = start; i < end; i++){
        if(AllCharacters.value[i] == undefined)break
        Characters.value.push(AllCharacters.value[i])
    }
})


async function getCharacters(id){
    const responce = await CharacterService.fetchCharacters(id)
    return responce
}

</script>

<style scoped>
h2{
    font-size: 1.5rem;
    font-weight: 800;
}
.card{
    color: white;
    display: flex;
    background-color:#3C3E44;
    margin: 30px 0 0 40px;
    width: 480px;
    height: 190px;
    border-radius: 15px;
}
.card__photo{
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}
.sections{
    display: block;
    padding: 10px;
}
.status-name__status{
    display: flex;
    margin: 10px 0 0 0
}
.status-name__status-alive{
    width: 10px;
    height: 10px;
    background-color: #55CC44;
    border-radius: 50%;
}
.status-name__status-dead{
    width: 10px;
    height: 10px;
    background-color: #D63D2E;
    border-radius: 50%;
}
.status-name__status-unknown{
    width: 10px;
    height: 10px;
    background-color: #9E9E9E;
    border-radius: 50%;
}
.last-location{
    margin: 25px 0 0 0;
}
.last-location span{
    color: rgb(158, 158, 158);
}
.last-location p {
    margin: 5px 0 0 0;
}
.first-seen{
    margin: 15px 0 0 0;
}
.first-seen span{
    color: rgb(158, 158, 158);
}
.first-seen p{
    margin: 5px 0 0 0;
}
</style>