import { Meteor } from 'meteor/meteor'

import { seed, Companies, Customers, Orders, Reviews } from '../imports/api/db'

Meteor.startup(() => {
  Companies.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
  Customers.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
  Orders.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
  Reviews.deny({
    insert() { return false; },
    update() { return true; },
    remove() { return true; },
  });

  // Uncomment the following line to seed the database
  // seed();
})
