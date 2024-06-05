<template>
  <div class="wrapper">

      <div class="container">
        <div class="selects">
          <div class="selectEpisode">
            <p>Выбор эпизода</p>
            <SelectEpisode :countEpisode="countEpisode"/>
          </div>
          <form class="filterCharacters">
            <p>Поиск персонажей</p>
            <SelectUI 
            :options="
            [{value:'Alive',text:'Alive'},
            {value:'Dead',text:'Dead'},
            {value:'unknown',text:'unknown'}]"
            />
            <inputName/>
            <button @click="acceptFilter">Применить</button>
          </form>
        </div>
      </div>
    
    
      <CardCharacter :episode="episode" :filter="filter"/>
    
    
      <PaginationsBtns :countPagination="countPagination"/>
    

  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import CardCharacter from './CardCharacter.vue';
import EpisodesService from '@/services/getEpisode';
import CountEpisodesService from '@/services/getCountEpisode';
import SelectEpisode from './UI/SelectEpisode.vue';
import SelectUI from './UI/SelectUI.vue'
import inputName from './UI/inputName.vue';
import { useMyStore } from '@/context';
import PaginationsBtns from './UI/PaginationsBtns.vue';
import FilterService from '@/services/getFilterCharacters';

const store = useMyStore()

let episode = ref({})
let filter = ref({})
let countEpisode = ref()
let countPagination = ref(1)

watch(()=>store.idEpisode,()=>{
  async function getEpisode(id){

    const responce = await EpisodesService.fetchEpisodes(id)

    return responce
  }

  getEpisode(store.idEpisode).then(el=>{
    countPagination.value = Math.ceil(el.data.characters.length / 6)
    store.changeActiveEpisode(el.data)
    episode.value = store.activeEpisode
  })
})
onMounted(()=>{
  async function getEpisode(){

    const responce = await EpisodesService.fetchEpisodes(1)

    return responce
  }

  getEpisode().then(el=>{
    countPagination.value = Math.ceil(el.data.characters.length / 6)
    store.changeActiveEpisode(el.data)
    store.changeIdEpisode(1)
    episode.value = store.activeEpisode
  })

  async function getCountEpisodes(){
    const responce = await CountEpisodesService.fetchCountEpisodes()

    return responce
  }

  getCountEpisodes().then(el=>{
    countEpisode.value = el.data.info.count
  })
})

function acceptFilter(event){
  event.preventDefault()
  if(store.nicknameCharacter == '' || store.nicknameCharacter == undefined)return
  if(store.statusCharacter == '' || store.nicknameCharacter == undefined)return
  countPagination.value = 1
  async function getFilter(name,status){
    const responce = await FilterService.fetchFilterCharacters(name,status)
    return responce
  }
  getFilter(store.nicknameCharacter.toLocaleLowerCase(),store.statusCharacter.toLocaleLowerCase()).then((el)=>{
    filter.value = el.data
  })
}
</script>

<style scoped>
.wrapper{
  display: grid;
  height: 100vh;
  grid-template-rows: 40px 1fr 25px;
}
.selects{
  display: flex;
  width: 100%;
  justify-content: space-evenly
}
.selectEpisode p{
  color: white
}
.filterCharacters p {
  color: white;
}
</style>