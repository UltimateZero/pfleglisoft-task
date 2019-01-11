import KpiDisplayComponent from '/imports/ui/KpiDisplay.vue'
import NotFoundComponent from '/imports/ui/NotFound.vue'
import ReviewPageComponent from '/imports/ui/ReviewPage.vue'
const routes = [
  {
    path: '/',
    name: "HomePage",
    component: KpiDisplayComponent
  },
  {
    path: '/review/:orderId',
    name: "ReviewPage",
    component: ReviewPageComponent
  },
  {
    path: '*',
    component: NotFoundComponent
  }
]
export default routes
