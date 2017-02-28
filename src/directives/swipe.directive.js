
import Vue from 'vue'

export default Vue.directive('swipe', {
    inserted: function (el, binding) {
        const hammertime = new Hammer(el);
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
        hammertime.on('swipe', (ev) => {
            ev.preventDefault()
            binding.value(ev.direction)
        })
    },
})