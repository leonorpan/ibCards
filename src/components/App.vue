<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="wrapper">
        <transition name="stack">
            <div v-if="notificationCards && notificationCards.length > 0" class="cards" key="cards">
                <transition-group tag="div" class="cardTransition">
                    <notification-card
                            v-for="(card, index) in notificationCards"
                            :key="index"
                            :user="card.user"
                            :description="card.description"
                            :requires-decision="card.requiresDecision"
                            :position="index"
                            v-on:confirm="confirmCard"
                            v-on:reject="rejectCard"
                            v-on:bringToTop="bringToTop(index)"
                            v-on:swipedCard="swipeCard"
                            :length="notificationCards.length"
                            :title="card.title">
                    </notification-card>
                </transition-group>
            </div>
            <div v-else class="info" key="info">
                <div class="cardNumber">
                    <button class="button-min" v-on:click="cards--">-</button>
                    <span>{{cards}}</span>
                    <button class="button-min" v-on:click="cards++">+</button>
                </div>
                <button v-once v-on:click="showCards()" class="btn button">{{ buttonText }}</button>
                <p v-if="cards < 0">Ehm, I cannot show a positive number of cards :)</p>
                <p v-if="notificationCards">Confirmed: {{confirmed}} Rejected: {{rejected}}</p>
            </div>
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue'
    import CardData from '../services/cnst.service'

    export default {
        data: function () {
            return {
                buttonText: 'Notifications',
                cards: 3,
                rejected : 0,
                confirmed: 0,
                notificationCards: undefined,
            }
        },
        methods: {
            showCards: function () {
                this.rejected = 0
                this.confirmed = 0
                this.notificationCards = []
                for (let i = 0; i < this.cards; i++) {
                    this.notificationCards.push({
                        title: _getRandomElementFromArray(CardData.titles),
                        description: _getRandomElementFromArray(CardData.descriptions),
                        requiresDecision:  Math.random() >= 0.3,
                        user: Math.random() >= 0.8
                                ? null
                                : {
                            name: _getRandomElementFromArray(CardData.usersNames),
                            img: _getRandomElementFromArray(CardData.userImages),
                            type: _getRandomElementFromArray(CardData.userTypes),
                        }
                    })
                }

                function _getRandomElementFromArray(arr) {
                    return arr[Math.floor(Math.random() * arr.length)]
                }
            },
            swipeCard: function () {
                if (!this.notificationCards[this.notificationCards.length - 1].requiresDecision) {
                    this.notificationCards.splice(-1,1)
                }
            },
            bringToTop: function (index) {
                if (index === this.notificationCards.length - 1) return
                const element = this.notificationCards[index]
                this.notificationCards.splice(index, 1)
                this.notificationCards.push(element)
            },
            confirmCard: function() {
                this.confirmed ++
                this.notificationCards.splice(-1,1)
            },
            rejectCard: function() {
                this.rejected ++
                this.notificationCards.splice(-1,1)
            },
        },
    }
</script>

<style scoped lang="sass">
    @import '../scss/_colors.scss';
    @import '../scss/_swing.scss';

    .wrapper {
        position: relative;
        width: 300px;
        height: 300px;
    }

    .cards {
        width: 300px;
        height: 300px;
        opacity: 1;
        position:absolute;
    }

    .info {
        opacity: 1;
        text-align: center;
        width: 300px;
        height: 200px;
        position:absolute;
    }

    .stack-enter-active, .stack-leave-active {
        opacity: 0;
        transition: all .2s ease-out;
    }
    .stack-enter, .stack-leave{
        transition: all .3s ease-in;
        opacity: 0;
    }

    .button {
        background-color: $ibBlue;
        text-transform: uppercase;
        color: white;
        min-width: 180px;
        min-height: 50px;
        border-radius: 0;
    }

    .cardNumber {
        margin-bottom: 20px;

        button {
            color: white;
            background-color: $ibBlue;
            border: none;
        }

        span {
            font-size: 20px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    .cardTransition {
        position: relative;
    }
</style>