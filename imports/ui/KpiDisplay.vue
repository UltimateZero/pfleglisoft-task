<template>
  <v-layout mt-5>
    <v-flex xs12
            sm8
            offset-sm2>
      <v-card>
        <v-card-title class="primary--text">
          <h2>KPIs (last month)</h2>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-actions>
          <v-layout justify-center
                    column>
            <v-flex align-self-center
                    justify-self-center>
              <v-select :items="companies"
                        v-model="selectedCompany"
                        item-text="name"
                        return-object></v-select>
            </v-flex>
            <v-layout align-self-space-between>

              <value-display>
                <span slot="percentage">{{ customerRatePercentage }}%</span>
                <span slot="title">Customer winning rate</span>
                <span slot="sub1">New customers: {{ newCustomers.length }}</span>
                <span slot="sub2">Requests: {{ customers.length }}</span>
              </value-display>

              <value-display>
                <span slot="percentage">{{ fulfilledOrdersPercentage }}%</span>
                <span slot="title">Order fulfillment</span>
                <span slot="sub1">Fulfilled orders: {{ fulfilledOrders.length }}</span>
                <span slot="sub2">Orders: {{ orders.length }}</span>
              </value-display>

              <value-display>
                <span slot="percentage">{{ satisfactionPercentage }}%</span>
                <span slot="title">Customer satisfaction</span>
                <span slot="sub1">Received ratings: {{ reviews.length }}</span>
                <span slot="sub2"></span>
              </value-display>

            </v-layout>
          </v-layout>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Companies, Customers, Orders, Reviews } from "../api/db";
import ValueDisplay from "/imports/ui/ValueDisplay.vue";

const MAX_RATING = 50;

function percentageOf(a, b) {
  return Math.ceil((a / b) * 100) || 0;
}

export default {
  components: {
    ValueDisplay
  },
  data() {
    return {
      selectedCompany: { _id: null, name: null },
      lastMonth: null
    };
  },
  computed: {
    customerRatePercentage() {
      return percentageOf(this.newCustomers.length, this.customers.length);
    },
    fulfilledOrdersPercentage() {
      return percentageOf(this.fulfilledOrders.length, this.orders.length);
    },
    satisfactionPercentage() {
      let sumOfReviews = this.reviews
        .map(
          r => r.basic + r.supply + r.communication + r.appearance + r.overall
        )
        .reduce((a, b) => a + b, 0);

      return percentageOf(sumOfReviews, this.reviews.length * MAX_RATING);
    },
    newCustomers() {
      return this.customers.filter(c => c.create_date >= this.lastMonth);
    },
    fulfilledOrders() {
      return this.orders.filter(order => order.done);
    },
    customers() {
      return Customers.find({
        companyId: this.selectedCompany._id
      }).fetch();
    },
    orders() {
      return Orders.find({
        companyId: this.selectedCompany._id,
        create_date: { $gte: this.lastMonth }
      }).fetch();
    },
    reviews() {
      return Reviews.find({
        companyId: this.selectedCompany._id,
        create_date: { $gte: this.lastMonth }
      }).fetch();
    }
  },
  mounted() {
    this.lastMonth = new Date();
    this.lastMonth.setDate(0);
    this.lastMonth.setDate(1);

    setTimeout(() => {
      if (
        !this.selectedCompany ||
        (!this.selectedCompany._id &&
          this.companies.length > 0 &&
          this.companies[0]._id)
      )
        this.selectedCompany = this.companies[0];
    }, 1000);
  },
  methods: {},
  meteor: {
    companies() {
      return Companies.find({}).fetch();
    }
  }
};
</script>


