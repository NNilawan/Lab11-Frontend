<template>
  <h1>Organizer For Good</h1>

  <div class="events">
    <div class="search-box">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search..."
        @input="updateKeyword"
      />
    </div>

    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'OrganizerList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'OrganizerList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OrganizerCard from '@/components/OrganizerCard.vue'
import OrganizerService from '@/services/OrganizerService.js'

// import axios from 'axios'
export default {
  name: 'OrganizerList',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    OrganizerCard // register it as a child component
  },
  data() {
    return {
      organizers: null,
      totalOrganizers: 0, // <--- Added this to store totalEvents
      keyword: null
    }
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    OrganizerService.getOrganizerList(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.organizers = response.data
          comp.totalOrganizers = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword === '') {
      queryFunction = OrganizerService.getOrganizerList(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = OrganizerService.getOrganizerByKeyword(
        this.keyword,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.organizers = response.data // <-----
        this.totalOrganizers = response.headers['x-total-count'] // <-----
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  methods: {
    updateKeyword() {
      var queryFunction
      if (this.keyword === '') {
        queryFunction = OrganizerService.getOrganizerList(3, 1)
      } else {
        queryFunction = OrganizerService.getOrganizerByKeyword(this.keyword, 3, 1)
      }

      queryFunction
        .then((response) => {
          this.organizers = response.data
          console.log(this.organizers)
          this.totalOrganizers = response.headers['x-total-count']
          console.log(this.totalOrganizers)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  },
  computed: {
    hasNextPage() {
      // First, calculate total pages
      let totalPages = Math.ceil(this.totalOrganizers / 3) // 2 is events per page

      // Then check to see if the current page is less than the total pages.
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-box {
  width: 300px;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
