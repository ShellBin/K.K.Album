function textLoading(lang) {
    return lang === 'zh' ? '加载中...' : lang === 'jp' ? '読み込み中...' : 'Loading...';
}

function textErrorFetchingAudio(lang) {
    return lang === 'zh' ? '音频加载失败' : lang === 'jp' ? '読み込み失敗' : 'Error fetching audio';
}

export { textLoading, textErrorFetchingAudio };