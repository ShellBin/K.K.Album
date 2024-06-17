import axios from 'axios';

/**
 * Player 类，用于处理带有循环功能的音频播放。
 */
class Player {
  /**
   * 创建 Player 的实例。
   */
  constructor() {
    this.audioContext = new AudioContext();
    this.audioBuffer = null;
    this.sourceNode = null;
    this.loopStart = 0;
    this.loopEnd = 0;
    this.status = 'stopped';
    this.isFirstPlay = true;
    this.stopedByUser = false;
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  /**
   * 加载音频文件并设置循环。
   * @param {string} url - 音频文件的 URL（mp3 格式）。
   * @param {string} [loopStart] - 循环起点时间（秒）。
   * @param {string} [loopEnd] - 循环终点时间（秒）。
   * @returns {Promise<void>} - 当音频加载并准备播放时返回一个 Promise。
   * @throws {Error} - 如果音频加载失败则抛出错误。
   */
  async load(url, loopStart, loopEnd) {
    this.audioBuffer = null;
    this.sourceNode = null;
    this.loopStart = parseFloat(loopStart) || 0;
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      this.audioBuffer = await this.audioContext.decodeAudioData(response.data);
      this.loopEnd = parseFloat(loopEnd) || this.audioBuffer.duration;
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
    this.status = 'stopped';
    this.isFirstPlay = true;
  }

  /**
   * 播放音频。
   */
  play() {
    if (this.sourceNode) {
      this.sourceNode.stop();
    }

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.connect(this.gainNode);

    this.sourceNode.start(0, this.isFirstPlay ? 0 : this.loopStart);

    this.sourceNode.onended = (event) => {
      this.handleAudioEnded(event)
    }
    this.status = 'playing';
    this.stopedByUser = false;
  }

  /**
   * 处理音频结束事件，并在必要时循环音频。
   */
  handleAudioEnded() {
    if (this.onAudioEnded) {
      const shouldContinue = this.onAudioEnded(this);
      if (!shouldContinue) {
        this.stop();
      }
    } else if (!this.stopedByUser) {
      this.isFirstPlay = false; // 第一次播放后设置为 false
      this.play();
    }
  }

  /**
   * 暂停音频。
   */
  stop() {
    if (this.sourceNode) {
      this.sourceNode.stop();
      this.status = 'stoped';
      this.isFirstPlay = true;
      this.stopedByUser = true;
    }
  }

  /**
   * 设置音频的音量。
   * @param {number} volume - 音量级别（0 到 1），按指数调整。
   */
  setVolume(volume) {
    this.gainNode.gain.value = Math.pow(volume, 2);
  }

  /**
   * 设置音频结束时的回调函数。
   * @param {function} callback - 回调函数，接收 Player 实例作为参数。
   */
  setOnAudioEnded(callback) {
    this.onAudioEnded = callback;
  }

  /**
   * 获取播放器的当前状态。
   * @returns {string} - 当前状态："playing"、"stopd" 或 "stopped"。
   */
  getStatus() {
    return this.status;
  }
}

export default Player;