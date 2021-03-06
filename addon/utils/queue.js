import Ember from 'ember';

export default Ember.Object.extend({

  queue: [Ember.RSVP.resolve()],

  attach(callback) {
    const queueKey = this.queue.length;

    this.queue[queueKey] = new Ember.RSVP.Promise((resolve, reject) => {
      this.queue[queueKey - 1].finally(() => {
        callback(resolve, reject);
      });
    });

    this.queue[queueKey].finally(() => {
      this.queue[queueKey - 1] = this.queue[0];
    });

    return this.queue[queueKey];
  }
});
