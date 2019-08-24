<template>
    <v-container>
        <v-layout text-center wrap>
            <v-flex xs12 mb-5>
                <h2 class="headline font-weight-bold mb-3">Countries</h2>

                <v-simple-table>
                    <thead>
                    <tr>
                        <th class="text-left">City</th>
                        <th class="text-left">Time</th>
                        <th class="text-left">Temperature</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in countries" :key="item['timezone']">
                        <td class="text-left">{{ item['timezone'] }}</td>
                        <td class="text-left">{{ item['currently']['time']|time(item['offset']) }}</td>
                        <td class="text-left">{{ item['currently']['temperature'] }}</td>
                    </tr>
                    </tbody>
                </v-simple-table>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import moment from 'moment'
    import io from 'socket.io-client'

    const host = location.protocol + "//" + location.host;

    export default {
        data: () => ({
            socket: io(host),
            countries: []
        }),
        mounted() {
            this.socket.on('response', this.response);
            this.request();
            setInterval(this.request, 10 * 1000)
        },
        methods: {
            request: function () {
                this.socket.emit('request', {})
            },
            response: function (data) {
                this.countries = data;
            }
        },
        filters: {
            time: function (time, offset) {
                console.log(time);
                return moment.unix(time).utcOffset(offset).format('HH:mm')
            }
        }
    };
</script>
