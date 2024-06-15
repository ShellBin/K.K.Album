<template>
    <div class="kk-cd-add button">
        <div class="kk-cd-add-button">
            <div class="icon icon-add"></div>
        </div>
    </div>
</template>

<style scoped>
.kk-cd-add {
    transform: scale(0.85);
    background-image: url('@/assets/img/kk-cd/button-adding.png');
    background-size: cover;
    transition: transform 0.1s ease-in-out;
    transform-origin: center;
    user-select:none;
}

@media (hover: hover) and (pointer: fine) {
  .kk-cd-add:hover {
    transform: scale(0.9);
  }
}

.kk-cd-add:active {
    transform: scale(0.88);
}
</style>