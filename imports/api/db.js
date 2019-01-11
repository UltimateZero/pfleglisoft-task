import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
export const Companies = new Mongo.Collection('companies')
export const Customers = new Mongo.Collection('customers')
export const Orders = new Mongo.Collection('orders')
export const Reviews = new Mongo.Collection('reviews')

Companies.schema = new SimpleSchema({
    name: String,
    create_date: { type: Date, defaultValue: new Date() }
});
Companies.attachSchema(Companies.schema)

Customers.schema = new SimpleSchema({
    companyId: String,
    name: String,
    create_date: { type: Date, defaultValue: new Date() }
});
Customers.attachSchema(Customers.schema)

Orders.schema = new SimpleSchema({
    companyId: String,
    customerId: String,
    done: Boolean,
    create_date: { type: Date, defaultValue: new Date() }
})
Orders.attachSchema(Orders.schema);

/*
    The ratings are out of 5 with 0.5 steps in the review page, 
    but it is better to save them in the database as integers out of 10, to avoid having to validate floats and making sure it's in halves.
    1 = 0.5
    2 = 1
    3 = 1.5
    ...
*/
Reviews.schema = new SimpleSchema({
    companyId: String,
    orderId: String,
    basic: { type: SimpleSchema.Integer, min: 0, max: 10 },  //0 0.5 1.0 1.5
    supply: { type: SimpleSchema.Integer, min: 0, max: 10 },
    communication: { type: SimpleSchema.Integer, min: 0, max: 10 },
    appearance: { type: SimpleSchema.Integer, min: 0, max: 10 },
    overall: { type: SimpleSchema.Integer, min: 0, max: 10 },
    create_date: { type: Date, defaultValue: new Date() }
})
Reviews.attachSchema(Reviews.schema);


function seed() {
    Companies.remove({});
    Customers.remove({});
    Orders.remove({});
    Reviews.remove({});

    Companies.insert({
        name: "Company 1"
    });
    Companies.insert({
        name: "Company 2"
    });
    let companyId = Companies.find().fetch()[0]._id;
    for (let i = 0; i < 350; i++) {
        Customers.insert({
            companyId,
            name: "Test name " + i,
            create_date: i < 270 ? new Date() : new Date(2018, 2, 2)
        })
    }

    let customerIds = Customers.find().fetch().map(c => c._id);
    for (let i = 0; i < 270; i++) {
        let customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        Orders.insert({
            companyId,
            customerId,
            done: i < 230 ? true : false
        })
    }
    let orderIds = Orders.find().fetch().map(o => o._id);

    for (let i = 0; i < 130; i++) {
        let orderId = orderIds[Math.floor(Math.random() * orderIds.length)];
        Reviews.insert({
            companyId,
            orderId,
            basic: Math.floor(Math.random() * 11),
            supply: Math.floor(Math.random() * 11),
            communication: Math.floor(Math.random() * 11),
            appearance: Math.floor(Math.random() * 11),
            overall: Math.floor(Math.random() * 11)
        })
    }

    console.log(Reviews.find().fetch());
}


// Uncomment the following line to seed the database, you probably have to refresh the page afterwards
seed()