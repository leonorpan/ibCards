

require('./scss/bootstrap.scss');
require('./scss/main.scss');

import Vue from 'vue';

var app = new Vue({
    el: '#app',
    data: {
        notificationCards: [
            {
                title: 'Pink Royale added new art!',
                user: 'Pink Royale',
                img: 'https://s23.postimg.org/ssdslelvv/ib_pink_Royale.png',
                type: 'artist',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent erat diam, luctus eget nunc eget, viverra luctus augue. Sed venenatis elit ut posuere placerat.',
                requiresDecision: false
            },
            {
                title: 'Pork Royale invites you to join their studio.',
                user: 'Pork Royale',
                img: 'https://s23.postimg.org/ssdslelvv/ib_pink_Royale.png',
                type: 'studio',
                description: 'Nunc et magna vitae enim faucibus dictum. Nulla at tellus turpis. Pellentesque ornare.',
                requiresDecision: true
            },{
                user: 'Pink pork',
                title: 'Pink pork loved your tattoo!',
                img: '',
                type: 'Addict',
                description: 'Etiam sit amet ex quis magna accumsan sollicitudin ac sit amet lacus. Nunc at ipsum augue.',
                requiresDecision: false
            }
        ],
        buttonText: 'Notifications',
        cards: false
    },
    methods: {
        showCards: function () {
            this.cards = true
        }
    }
})

Vue.component('notification-card', {
    template:  ` <div class="card">
                    <div class="card-header">
                        <span>{{title}}</span>
                    </div>

                <div class="card-profile">
                    <div class="avatar"></div>
                    <div class="name">{{user}}</div>
                    <div class="type">{{type}}</div>
                </div>

                <div class="card-description">{{description}}</div>

                <div v-if="requiresDecision" class="card-buttons">
                    <div class="card-buttons-confirm">Confirm</div>
                    <div class="card-buttons-reject">Reject</div>
                </div>
            </div>`,
    props: ['user', 'title', 'type', 'description', 'requiresDecision'],
})

