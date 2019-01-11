<template>
  <v-layout mt-5>
    <v-flex xs12
            sm8
            offset-sm2>
      <v-layout v-if="!order"
                align-center>
        <v-flex text-xs-center>
          <h1>Sorry, request id not found</h1>
        </v-flex>
      </v-layout>
      <v-card v-else>
        <v-card-title class="primary--text">
          <h2>Hi, {{ customer.name }}! How do you rate our services?</h2>
        </v-card-title>
        <v-card-text>
          <v-layout justify-center
                    pl-3
                    column>
            <v-layout row
                      class="text-xs-center subheading"
                      align-center>
              Basic care:
              <v-spacer></v-spacer>
              <span>
                ({{ basic }}) &nbsp;
              </span>
              <v-rating v-model="basic"
                        :readonly="loading"
                        clearable
                        half-increments
                        hover></v-rating>
            </v-layout>
            <v-layout row
                      class="text-xs-center subheading"
                      align-center>
              Household supply:
              <v-spacer></v-spacer>
              <span>
                ({{ supply }}) &nbsp;
              </span>
              <v-rating v-model="supply"
                        :readonly="loading"
                        clearable
                        half-increments
                        hover></v-rating>
            </v-layout>
            <v-layout row
                      class="text-xs-center subheading"
                      align-center>
              Communication:
              <v-spacer></v-spacer>
              <span>
                ({{ communication }}) &nbsp;
              </span>
              <v-rating v-model="communication"
                        :readonly="loading"
                        clearable
                        half-increments
                        hover></v-rating>
            </v-layout>
            <v-layout row
                      class="text-xs-center subheading"
                      align-center>
              Visual appearance:
              <v-spacer></v-spacer>
              <span>
                ({{ appearance }}) &nbsp;
              </span>
              <v-rating v-model="appearance"
                        :readonly="loading"
                        clearable
                        half-increments
                        hover></v-rating>
            </v-layout>
            <v-layout row
                      class="text-xs-center subheading"
                      align-center>
              Overall rating:
              <v-spacer></v-spacer>
              <span>
                ({{ overall }}) &nbsp;
              </span>
              <v-rating v-model="overall"
                        :readonly="loading"
                        clearable
                        half-increments
                        hover></v-rating>
            </v-layout>

          </v-layout>

        </v-card-text>
        <v-divider light></v-divider>
        <v-card-actions class="justify-end">
          <v-btn :disabled="loading"
                 :loading="loading"
                 color="primary"
                 flat
                 class="font-weight-bold"
                 @click="rateClicked">
            Rate Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-snackbar v-model="snackbar"
                bottom>
      Success
      <v-btn color="pink"
             flat
             @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { Orders, Reviews, Customers } from "../api/db";
export default {
  data() {
    return {
      basic: 0,
      supply: 0,
      communication: 0,
      appearance: 0,
      overall: 0,
      order: null,
      loading: false,
      snackbar: false
    };
  },
  computed: {
    customer() {
      return Customers.findOne({ _id: this.order.customerId });
    }
  },
  watch: {
    $route(to) {
      console.log("New route:", to);
      if (to.name !== "ReviewPage") return;
      this.order = this.findOrder(to.params.orderId);
    }
  },
  mounted() {
    this.snackbar = false;
    this.$autorun(() => {
      if (this.$route.params.orderId === "random") {
        let orders = Orders.find({}).fetch();
        this.order = orders[Math.floor(Math.random() * orders.length)];
        console.log("Random order", this.order);
      } else {
        this.order = this.findOrder(this.$route.params.orderId);
      }
    });
  },
  methods: {
    findOrder(orderId) {
      return Orders.findOne({ _id: orderId });
    },
    rateClicked() {
      let review = {
        orderId: this.order._id,
        companyId: this.order.companyId,
        basic: this.basic * 2,
        supply: this.supply * 2,
        communication: this.communication * 2,
        appearance: this.appearance * 2,
        overall: this.overall * 2
      };
      console.log("Review:", review);
      this.loading = true;
      this.$autorun(() => {
        Reviews.insert(review);
        setTimeout(() => {
          this.loading = false;
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        }, 2000);
      });
    }
  }
};
</script>
