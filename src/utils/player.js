import axios from 'axios';

/**
 * Player 类，用于处理带有循环功能的音频播放。
 */
class Player {
  /**
   * 创建 Player 的实例。
   */
  constructor() {
    this.audio = new Audio();
    this.loopStart = 0;
    this.loopEnd = 0;
    this.status = 'stopped'; // 初始状态
  }

  /**
   * 加载音频文件并设置循环。
   * @param {string} url - 音频文件的 URL（mp3 格式）。
   * @param {string} loopStart - 循环起点时间（秒）。
   * @param {string} loopEnd - 循环终点时间（秒）。
   * @returns {Promise<void>} - 当音频加载并准备播放时返回一个 Promise。
   * @throws {Error} - 如果音频加载失败则抛出错误。
   */
  async load(url, loopStart, loopEnd) {
    this.loopStart = parseFloat(loopStart) || 0;
    this.loopEnd = parseFloat(loopEnd) || 0;
    
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      await this.decodeAudioData(response.data); // 解码音频数据，但不使用 audioBuffer
      this.audio.src = url;
      this.audio.addEventListener('ended', this.handleAudioEnded.bind(this));
      this.audio.addEventListener('canplaythrough', () => {
        // 音频可以开始播放时的回调
        this.play();
      });
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
  }

  /**
   * 解码来自 ArrayBuffer 的音频数据。
   * @param {ArrayBuffer} arrayBuffer - 要解码的音频数据。
   * @returns {Promise<void>} - 当音频数据解码完成时返回一个 Promise。
   */
  decodeAudioData(arrayBuffer) {
    return new Promise((resolve, reject) => {
      const audioContext = new AudioContext();
      audioContext.decodeAudioData(arrayBuffer, resolve, reject);
    });
  }

  /**
   * 处理音频结束事件，并在必要时循环音频。
   */
  handleAudioEnded() {
    if (this.loopEnd > 0 && this.audio.currentTime >= this.loopEnd) {
      this.audio.currentTime = this.loopStart;
    } else if (this.loopStart > 0) {
      this.audio.currentTime = this.loopStart;
    } else {
      this.audio.currentTime = 0;
    }
    this.play();
  }

  /**
   * 播放音频。
   */
  play() {
    this.audio.play();
    this.status = 'playing';
  }

  /**
   * 暂停音频。
   */
  pause() {
    this.audio.pause();
    this.status = 'paused';
  }

  /**
   * 设置音频的音量。
   * @param {number} volume - 音量级别（0 到 1），按指数调整。
   */
  setVolume(volume) {
    this.audio.volume = Math.pow(volume, 2);
  }

  /**
   * 获取播放器的当前状态。
   * @returns {string} - 当前状态："playing"、"paused" 或 "stopped"。
   */
  getStatus() {
    return this.status;
  }
}

export default Player;