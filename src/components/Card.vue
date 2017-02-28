<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <!-- ... -->
    <div class="card" :style="cardPositioning" v-swipe="swipeCard">
        <div class="header" :style="cardHeader" v-on:click="$emit('bringToTop')">
            <span>{{title}}</span>
        </div>

        <div class="profile" v-if="user">
            <div class="avatar" :style="bgImage"></div>
            <div class="name">{{user.name}}</div>
            <div class="type">{{user.type}}</div>
        </div>

        <div class="description">{{description}}</div>

        <div v-if="requiresDecision" class="buttons">
            <div class="confirm" v-on:click="confirmCard()">Confirm</div>
            <div class="button" v-on:click="rejectCard()">Reject</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $ from 'jquery'

    export default Vue.component('notification-card', {
        props: {
            title: String,
            user: Object,
            description: String,
            position: Number,
            length: Number,
            requiresDecision: Boolean,
        },
        computed: {
            bgImage: function () {
                return {'background-image': `url(${this.user.img})`,}
            },
            cardPositioning: function () {
                const calcPosition = this.length - this.position - 1
                const scale = calcPosition < 8 ? 1 - calcPosition / 10: 0
                return {
                    'margin-top': `-${26 * calcPosition + 2 * this.position}px`,
                    'transform': `scale(${scale},${scale})`,
                }
            },
            cardHeader: function () {
                const darken = 249 - (this.length - this.position) * 10
                return {
                    'background': `rgb(${darken}, ${darken}, ${darken})`,
                }
            },
        },
        methods: {
            swipeCard: function (direction) {
                const $el = $(this.$el)
                if (this.requiresDecision) {
                    const animationClass = direction <= 4 ? 'tiltCard' : 'shakeCard'
                    $el.removeClass('tiltCard').removeClass('shakeCard')
                    // dirty hack to retriger animation without removing and adding again elements on the dom
                    void this.$el.offsetWidth;
                    $el.addClass(animationClass)
                } else {
                    if (direction === 2) {
                        $el.addClass('swipeLeft')
                    } else if (direction === 4) {
                        $el.addClass('swipeRight')
                    } else if (direction === 8) {
                        $el.addClass('swipeUp')
                    } else {
                        $el.addClass('swipeDown')
                    }
                }
                this.$emit('swipedCard')
            },
            confirmCard: function () {
                $(this.$el).addClass('swipeLeft')
                this.$emit('confirm')
            },
            rejectCard: function () {
                $(this.$el).addClass('swipeRight')
                this.$emit('reject')
            },
        }
    })
</script>


<style scoped lang="sass">
    @import '/../scss/colors';

    .card {
        transition: all .4s ease-out;
        width: 300px;
        height: 294px;
        background-color: white;
        display: flex;
        opacity: 1;
        flex-direction: column;
        position:absolute;
        left: 0;
        top: 0;
    }

    .swipeLeft {
        top: -100px;
        transition: all .4s ease-out;
        opacity: 0;
        width: 300px;
        left: -200px;
    }

    .swipeRight {
        top: -100px;
        transition: all .4s ease-out;
        opacity: 0;
        width: 300px;
        left: 200px;
    }

    .swipeUp {
        top: -400px;
        transition: all .4s ease-out;
        opacity: 0;
        width: 300px;
    }

    .swipeDown {
        top: 400px;
        transition: all .4s ease-out;
        opacity: 0;
        width: 300px;
    }

    .header {
        height: 38px;
        width: 100%;
        background-color: $cardHeader;
        text-align: center;
        border-bottom: 1px solid #eeeeee;

        span {
            font-size: 12px;
            line-height: 38px;
            color: $baseBlack;
        }
    }

    .buttons {
        display: flex;
        align-self: flex-end;
        height: 50px;
        width: 100%;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        width: 50%;
        font-size: 10px;

        &:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }

    .confirm {
        @extend .button;
        background-color: $ibBlue;
        color: white;
    }

    .profile {
        width: 100%;
        min-height: 100px;
        text-align: center;

        .avatar {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: no-repeat 50% 50%;
            background-size: cover;
            margin: 24px auto 10px;
        }

        .name {
            text-transform: uppercase;
            font-weight: 500;
            font-size: 10px;
            line-height: 16px;
        }

        .type {
            color: $darkGrey;
            font-size: 10px;
            line-height: 14px;
            text-transform: uppercase;
        }
    }

    .description {
        flex-grow: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 8px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
        color: $darkGrey;
        font-size: 12px;
        line-height: 18px;
    }

    .tiltCard {
        animation: swing 1s ease-in;
    }

    .shakeCard {
        animation: shake 1s ease-in;
    }

</style>