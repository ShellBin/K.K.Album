const translations = {
    loading: {
        zh: '加载中...',
        jp: '読み込み中...',
        en: 'Loading...'
    },
    errorFetchingAudio: {
        zh: '音频加载失败',
        jp: '音声取得エラー',
        en: 'Audio Error'
    },
    kkSong: {
        zh: 'K.K.歌曲',
        jp: 'K.K.ソング',
        en: 'K.K. Song'
    },
    musicBox: {
        zh: '音乐盒',
        jp: 'オルゴール',
        en: 'Music Box'
    },
    cd: {
        zh: 'CD版',
        jp: 'CD版',
        en: 'CD Version'
    },
    about: {
        zh: '关于',
        jp: 'について',
        en: 'About'
    },
    hiddenTrack: {
        zh: '隐藏曲',
        jp: '隠し曲',
        en: 'Hidden Track'
    },
    shuffle: {
        zh: '打乱',
        jp: 'サフォ',
        en: 'Shuffle'
    },
    loop: {
        zh: '循环',
        jp: 'ループ',
        en: 'Loop'
    },
    language: {
        zh: '中文',
        jp: '日本語',
        en: 'English'
    }
};

function getText(key, lang) {
    return translations[key][lang] || translations[key].en;
}

export { getText };