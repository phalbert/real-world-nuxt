<template>
  <div>
    <h1>Event #{{ id }} - {{ event.title }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, error, params }) {
    try {
      const response = await $axios.get(
        `https://5d6516c05b26ae001489eb85.mockapi.io/api/v1/events/${params.id}`
      )
      return { event: response.data }
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
