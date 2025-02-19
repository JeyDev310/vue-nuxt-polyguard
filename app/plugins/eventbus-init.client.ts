import mitt, { type Emitter } from 'mitt'
import { defineNuxtPlugin } from '#imports'

type EventTypes = {
  'layout-clicked': Event
}

const emitter: Emitter<EventTypes> = mitt<EventTypes>()

export default defineNuxtPlugin(() => {
  console.log('plugins/eventbus-init.client.ts')

  return {
    provide: {
      eventBus: {
        $on: <K extends keyof EventTypes>(
          event: K,
          handler: (data: EventTypes[K]) => void,
        ): void => emitter.on(event, handler),
        $emit: <K extends keyof EventTypes>(
          event: K,
          data: EventTypes[K],
        ): void => emitter.emit(event, data),
      },
    },
  }
})
