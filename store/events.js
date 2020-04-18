import EventService from '@/services/EventService.js'

// export const namespaced = true

export const state = () => ({
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 5
})

export const mutations = {
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents((page = 1), state.perPage)
      .then((response) => {
        commit('SET_EVENTS_TOTAL', parseInt(50))
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, state }, id) {
    if (id === state.event.id) {
      return state.event
    }

    const event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then((response) => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  }
}
export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  }
}
