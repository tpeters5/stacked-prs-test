class TaskQueue {
  constructor(concurrency = 3) { this.concurrency = concurrency; this.pending = []; this.running = 0; }
  add(task, priority = 0) { this.pending.push({ task, priority }); this.pending.sort((a, b) => b.priority - a.priority); return { queued: true, position: this.pending.length }; }
  async process() { while (this.pending.length && this.running < this.concurrency) { this.running++; const item = this.pending.shift(); await item.task(); this.running--; } }
}
module.exports = { TaskQueue };
