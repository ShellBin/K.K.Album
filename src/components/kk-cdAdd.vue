<template>
    <div class="kk-cd-add-wrapper button" @click="setModalDisplay">
        <div class="kk-cd-add">
            <div class="icon-add"></div>
            <div class="text">{{ getText('add', lang) }}</div>
        </div>
    </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
import { computed } from 'vue';
import { getText } from '@/utils/i18n';

const store = useMainStore();

function setModalDisplay() {
    store.setModalDisplay('cdAdd');
}

const lang = computed(() => {
  return useMainStore().lang;
});

</script>

<style scoped>
.kk-cd-add-wrapper {
    transform: scale(0.85);
    background-image: url('@/assets/img/kk-cd/button-adding.png');
    background-size: cover;
    transition: transform 0.1s ease-in-out;
    transform-origin: center;
    user-select:none;
}

.kk-cd-add {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #4A5BA4;
}

.icon-add {
    margin-top: 20%;
    width: 35%;
    height: 35%;
    background-image: url('@/assets/img/kk-cd/button-adding-icon.png');
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
}

.text {
    margin-top: 10%;
    font-size: 170%;
    font-weight: 600;
}


@media (hover: hover) and (pointer: fine) {
  .kk-cd-add-wrapper:hover {
    transform: scale(0.9);
  }
}

.kk-cd-add-wrapper:active {
    transform: scale(0.88);
}
</style>