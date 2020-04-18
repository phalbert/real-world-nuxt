<template>
  <div>
    <h1>Event #{{ id }} - {{ event.title }}</h1>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  async asyncData({ error, params }) {
    try {
      const { data } = await EventService.getEvent(params.id)
      return { event: data }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time, please try again'
      })
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  head() {
    return {
      title: `Event #${this.id}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about ' + this.event.title
        }
      ]
    }
  }
}
</script>
