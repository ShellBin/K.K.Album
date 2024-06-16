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
    this.isFirstPlay = true; // 标志是否为第一次播放
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
    this.loopStart = parseFloat(loopStart) || 0;
    this.loopEnd = parseFloat(loopEnd) || 0;

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      this.audioBuffer = await this.audioContext.decodeAudioData(response.data);
      this.play();
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
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
    this.sourceNode.connect(this.audioContext.destination);

    if (this.loopStart > 0 || this.loopEnd > 0) {
      this.sourceNode.loop = !this.isFirstPlay;
      this.sourceNode.loopStart = this.loopStart;
      this.sourceNode.loopEnd = this.loopEnd;
    } else {
      this.sourceNode.loop = true;
    }

    this.sourceNode.start(0, this.isFirstPlay ? 0 : this.loopStart);
    this.sourceNode.addEventListener('ended', this.handleAudioEnded.bind(this));
    this.status = 'playing';
  }

  /**
   * 处理音频结束事件，并在必要时循环音频。
   */
  handleAudioEnded() {
    console.log(1, this.isFirstPlay)
    console.log('handleAudioEnded', this.sourceNode.loop, this.loopStart, this.loopEnd)
    this.isFirstPlay = false; // 第一次播放后设置为 false
    if (this.sourceNode.loop) {
      // If looping is enabled, restart the playback
      this.play();
    } else if (this.loopStart >= 0 && this.loopEnd <= 0) {
      // If no loop points are set, restart the playback
      console.log(2, this.isFirstPlay);
      this.play();
    }
  }

  /**
   * 暂停音频。
   */
  pause() {
    if (this.sourceNode) {
      this.sourceNode.stop();
      this.status = 'paused';
      this.isFirstPlay = true;
    }
  }

  /**
   * 设置音频的音量。
   * @param {number} volume - 音量级别（0 到 1），按指数调整。
   */
  setVolume(volume) {
    this.audioContext.destination.gain.value = Math.pow(volume, 2);
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