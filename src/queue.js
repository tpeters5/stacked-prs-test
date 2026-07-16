class TaskQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.pending = [];
    this.running = 0;
    this.completed = [];
  }

  add(task, priority = 0) {
    this.pending.push({ task, priority, addedAt: Date.now() });
    this.pending.sort((a, b) => b.priority - a.priority);
    return { queued: true, position: this.pending.length, pending: this.pending.length };
  }

  async process() {
    while (this.pending.length && this.running < this.concurrency) {
      const item = this.pending.shift();
      this.running++;
      try {
        const result = await item.task();
        this.completed.push({ result, completedAt: Date.now() });
      } finally { this.running--; }
    }
    return { completed: this.completed.length, remaining: this.pending.length, active: this.running };
  }

  stats() { return { pending: this.pending.length, running: this.running, completed: this.completed.length }; }
}

module.exports = { TaskQueue };
