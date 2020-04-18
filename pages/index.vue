<template>
  <div>
    <h1>Events</h1>
    <EventCard
      v-for="(event, index) in events"
      :key="index"
      :event="event"
      :data-index="index"
    />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import EventService from '@/services/EventService.js'

export default {
  components: {
    EventCard
  },
  async asyncData({ $axios, error }) {
    try {
      const { data } = await EventService.getEvents(1, 10)
      return { events: data }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time, please try again'
      })
    }
  },
  head() {
    return {
      title: 'Listing'
    }
  }
}
</script>
