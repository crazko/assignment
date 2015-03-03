function Timer (targetTimer, targetDate) {
  this.targetTimer = targetTimer;
  this.targetDate  = new Date(targetDate);

  this.second = 1000;
  this.minute = 60 * this.second;
  this.hour   = 60 * this.minute;
  this.day    = 24 * this.hour;

  this.inteval = null;
}

Timer.prototype = {
  constructor: Timer,

  start:function() {
    var self=this;

    this.setMessage('Time remaining till ' + this.targetDate.toDateString());
    this.calculate();

    this.interval = window.setInterval(function(){
      self.calculate();
    }, this.second);
  },

  calculate:function() {
    var now  = new Date()
      , diff = this.targetDate - now;

    if (diff < 0) {
      window.clearTimeout(this.interval);
      this.setMessage('Finished');

      return;
    }

    var diff_days    = Math.floor(diff / this.day)
      , diff_hours   = Math.floor((diff % this.day) / this.hour)
      , diff_minutes = Math.floor((diff % this.hour) / this.minute)
      , diff_seconds = Math.floor((diff % this.minute) / this.second);

    this.showDiff('day', diff_days);
    this.showDiff('hour', diff_hours);
    this.showDiff('minute', diff_minutes);
    this.showDiff('second', diff_seconds);
  },

  plural:function (unit) {
    return unit == 1 ? '' : 's';
  },

  showDiff:function (unit, diff) {
    var target = this.targetTimer + '-' + unit;

    document.getElementById(target).innerHTML = '<strong>' + diff + '</strong>' + unit + this.plural(diff);
  },

  setMessage:function (msg) {
    var target = this.targetTimer + '-message';

    document.getElementById(target).innerHTML = msg;
  }
}
