/* Prepare Call — the original script.js was never committed, so this is written
   back to match what the client demonstrated: fill in name, date and guests,
   press the button, and it hands you the sentence to say and places the call.
   No library. With JavaScript off the form simply does nothing and every other
   phone link on the page still works. */
(function () {
  var form = document.getElementById('booking-form');
  if (!form) return;

  var TEL = '+441442954333';
  var date = form.querySelector('input[name="date"]');
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var now = new Date();
  var today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());

  // Default to today, and refuse a date that has already gone — the copy the
  // client was shown defaulted to a date in the past.
  if (date) { date.value = today; date.min = today; }

  var out = document.createElement('p');
  out.className = 'booking-say';
  out.hidden = true;
  form.parentNode.appendChild(out);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (form.querySelector('input[name="name"]').value || '').trim();
    var guests = form.querySelector('select[name="guests"]').value;
    var when = '';

    if (date && date.value) {
      var p = date.value.split('-');
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      when = date.value === today
        ? 'today'
        : 'on ' + d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    var who = name ? 'it’s ' + name : 'I’d like to book';
    var line = 'Hello, ' + who + '. A table for ' + guests.toLowerCase() +
               (when ? ' ' + when : '') + ', please.';

    out.textContent = line;
    out.hidden = false;
    window.location.href = 'tel:' + TEL;
  });
})();
