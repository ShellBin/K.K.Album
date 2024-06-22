<template>
  <div class="kk-modal-wrapper">
    <div class="kk-modal-overlay" @click="setModalDisplay"></div>
    <transition name="modal-pop">
      <div v-show="showDialog" class="kk-modal" :class="{
        'kk-modal-normal': modalType !== 'about',
        'kk-modal-about': modalType === 'about'
      }">
        <div v-if="modalType === 'cdAdd'" class="kk-modal-content cdadd">
          <div style="margin-bottom: 20px;">{{ getText('addTips', lang) }}</div>
          <div class="kk-modal-button-back kk-button" @click="setModalDisplay">
            <div style="margin-top: 5px;">{{ getText('ok', lang) }}</div>
          </div>
        </div>
        <div v-if="modalType === 'about'" class="kk-modal-content about">
          <div class="kk-modal-content-title">{{ getText('aboutTitle', lang) }}</div>
          <div class="kk-modal-content-text">
            <div class="kk-quotes">
              <span class="kk-quotes-text">“Nothing shredded, nothing gained.” </span>
              <span class="kk-quotes-name">K.K. Slider</span>
            </div>
            <div class="contributions">
              <div v-for="author in contributions"
                :key="author.name" class="author kk-button"
                @click="openLink(author.url)">
                <div class="avatar" :class="{ online: author.online }">
                  <img class="avatar" :src="author.avatar" alt="avatar" /></div>
                <span class="name">{{ author.name }}</span>
                <span class="desc">{{ author.desc }}</span>
              </div>
            </div>
          </div>
          <transition name="notification-pop">
            <div class="kk-notification" v-show="showNotification">
              <div class="kk-notification-content">
                <span>{{ getText('shareTips', lang) }}</span>
              </div>
            </div>
          </transition>
          <img class="kk-modal-button-sub kk-button share"
            src="@/assets/img/kk-modal/button-share.png"
            alt="share Button"
            @click="copyLink(pageURL)" />
          <div class="kk-modal-button-back kk-button" @click="setModalDisplay">
            <div style="margin-top: 5px;">{{ getText('back', lang) }}</div>
          </div>
            <img class="kk-modal-button-sub kk-button github"
            src="@/assets/img/kk-modal/button-github.png"
            alt="GitHub Button" @click="openLink(githubURL)" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
import { computed, ref, onMounted } from 'vue'
import { getText } from '@/utils/i18n';

import shellbinAvatar from '@/assets/img/kk-modal/avatar/shellbin.png';
import rokuAvatar from '@/assets/img/kk-modal/avatar/roku.png';
import harutonoAvatar from '@/assets/img/kk-modal/avatar/harutono.png';


const store = useMainStore();
const isModalVisible = computed(() => store.modalDisplay !== '');
const modalType = computed(() => store.modalDisplay);
const lang = computed(() => store.lang);
const showDialog = ref(false);
const showNotification = ref(false);

const contributions = ref([
  { name: 'ShellBin', url: 'https://shellbin.me', avatar: shellbinAvatar , desc: 'Cooode!', online: true},
  { name: 'Roku', url: 'https://kazamihatsuroku.top/', avatar: rokuAvatar, desc: 'Nurrrturing!', online: false},
  { name: 'Harutono', url: 'https://tonoko.moe/anna/', avatar: harutonoAvatar, desc: 'Figggma!', online: true},
]);
const githubURL = 'https://github.com/ShellBin/K.K.Album/';
const pageURL = 'https://kk-album.shellbin.me/';

function openLink(url) {
  window.open(url, '_blank');
}

function copyLink(url) {
  navigator.clipboard.writeText(url);
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
}

function setModalDisplay() {
  store.setModalDisplay('');
}

onMounted(() => {
  if (isModalVisible.value) {
    setTimeout(() => {
      showDialog.value = true;
    }, 100);
  }
});
</script>

<style scoped>
.kk-modal-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/kk-modal/dot.png') repeat;
  z-index: 1000;
}

.kk-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.4);
  z-index: 999;
}

.kk-modal {
  margin: 0 5vw;
  width: max(60vw, 900px);
  max-width: 900px;
  color: #837055;
  display: flex;
  justify-content: center;
  z-index: 1200;
}

.kk-modal-normal {
  aspect-ratio: 1.7 / 1;
  background: url('@/assets/img/kk-modal/content-bubble.png') no-repeat;
  background-size: 100% 100%;
}

.kk-modal-about {
  aspect-ratio: 1.5 / 1;
  background: url('@/assets/img/kk-modal/content-bubble-with-header.png') no-repeat;
  background-size: 100% 100%;
}

.kk-modal-content {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.cdadd {
  font-size: min(4vw, 30px);
}

.kk-modal-content-title {
  position: absolute;
  color: #4E754B;
  font-size: min(4vw, 30px);
  border-radius: 50%;
  top: 8%;
}

.kk-modal-content-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
}

.kk-quotes {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #C6B297;
}

.kk-quotes-text {
  font-size: min(3vw, 22.5px);
}

.kk-quotes-name {
  font-size: min(2vw, 15px);
  font-weight: 200
}

.contributions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5% 0 3% 0;
  width: min(40vw, 400px);
  max-width: 425px;
}

.author {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: min(11vw, 110px);
  border-radius: 50%;
}

.online::after {
  content: '';
  position: absolute;
  top: 3%;
  left: 3%;
  width: min(2vw, 15px);
  height: min(2vw, 15px);
  border-radius: 50%;
  border: min(0.6vw, 4px) solid #fefae4;
  background-color: #50b163;
  z-index: 10;
}

.name {
  margin-top: 6%;
  font-size: min(2.8vw, 22.5px);
}

.desc {
  font-size: min(2vw, 15px);
}

.kk-modal-button-back {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/img/kk-modal/button-ok.png') no-repeat;
  color: #DAFFF5;
  background-size: 100% 100%;
  bottom: 10%;
  width: min(40vw, 400px);
  height: min(10vw, 100px);
  font-size: min(4vw, 30px);
}

.kk-modal-button-sub {
  position: absolute;
  bottom: 10%;
  height: min(10vw, 100px);
}

.share {
  left: 9%;
}

.github {
  right: 9%;
}

.kk-notification {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -18%;
  width: min(60vw, 600px);
  background: url('@/assets/img/kk-modal/share-tip.png') no-repeat;
  background-size: 100% 100%;
  color: #837055;
  font-size: min(3vw, 22.5px);
  font-weight: bold;
  animation: notification-pop 0.5s ease-in-out;
  z-index: 1500;
}

@media screen and (max-height: 880px) {
  .kk-notification {
    bottom: 0;
  }
}

@media screen and (max-height: 500px) {
  .kk-modal {
    transform: scale(0.8);
  }
}

@keyframes notification-pop-enter {
  0% {
    transform: rotate(-15deg) translateY(-20px);
    opacity: 0;
    transform-origin: left top;
  }
  100% {
    transform: rotate(0deg) translateY(0);
    opacity: 1;
    transform-origin: left top;
  }
}

@keyframes notification-pop-leave {
  0% {
    transform: rotate(0deg);
    opacity: 1;
    transform-origin: left top;
  }
  100% {
    transform: rotate(-30deg);
    opacity: 0;
    transform-origin: left top;
  }
}

.notification-pop-enter-active {
  animation: notification-pop-enter 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.notification-pop-leave-active {
  animation: notification-pop-leave 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.kk-notification-content {
  margin: min(5vw, 50px) min(5vw, 50px) min(2vw, 20px ) min(5vw, 50px);
}

.kk-button {
  transition: transform 0.2s ease;
}

.kk-button:hover {
  transform: scale(1.05);
}

.modal-pop-enter-active, .modal-pop-leave-active {
  transition: transform 0.1s ease-in-out;
}

.modal-pop-enter-from {
  transform: scale(1.05);
}

.modal-pop-enter-to {
  transform: scale(1);
}

.modal-pop-leave-from {
  transform: scale(1.05);
}

.modal-pop-leave-to {
  transform: scale(1.05);
}
</style>