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

export default {
  components: {
    EventCard
  },
  asyncData({ $axios, error }) {
    return $axios
      .get('https://5d6516c05b26ae001489eb85.mockapi.io/api/v1/events')
      .then((response) => {
        return {
          events: response.data
        }
      })
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to fetch events at this time, please try again'
        })
      })
  },
  head() {
    return {
      title: 'Listing'
    }
  }
}
</script>
