import Vue from "vue";
import VueRouter from "vue-router";
import Standings from "@/views/Standings.vue";
import TeamStats from "@/views/TeamStats.vue";
import Roster from "@/views/Roster.vue";
import Lines from "@/views/Lines.vue";
import SpecialLines from "@/views/SpecialLines.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    component: Standings
  },
  {
    path: "/standings",
    name: "standings",
    component: Standings
  },
  {
    path: "/team-stats",
    name: "teamStats",
    component: TeamStats
  },
  {
    path: "/roster",
    name: "roster",
    component: Roster
  },
  {
    path: "/lines",
    name: "lines",
    component: Lines
  },
  {
    path: "/special-lines",
    name: "specialLines",
    component: SpecialLines
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
