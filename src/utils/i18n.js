const translations = {
    add: {
        zh: '添加',
        jp: '追加',
        en: 'Add'
    },
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
    },
    ok: {
        zh: '确定',
        jp: '確定',
        en: 'OK'
    },
    back: {
        zh: '返回',
        jp: '戻る',
        en: 'Back'
    },
    addTips: {
        zh: '你没有可登录的曲目哦！',
        jp: 'ログインできる曲がありません！',
        en: 'You have no loginable tracks!'
    },
    aboutTitle: {
        zh: 'K.K. Album 唱片点播界面',
        jp: 'K.K. Album プレーヤー',
        en: 'K.K. Album Player'
    },
    shareTips: {
        zh: '链接已复制，分享给好朋友吧~',
        jp: 'リンクをコピーしました！友達に共有してみてください！',
        en: 'Link copied, share it with your friends!'
    }
};

function getText(key, lang) {
    return translations[key][lang] || translations[key].en;
}

export { getText };