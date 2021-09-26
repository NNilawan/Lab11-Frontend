<template>
  <div v-if="GStore.organizer">
    
    <div id="nav">
      <router-link :to="{ name: 'OrganizerDetails' }">Organizer Details</router-link>
    </div>

    <h1>{{ GStore.organizer.name }}</h1>
    <router-view :organizer="GStore.organizer" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
