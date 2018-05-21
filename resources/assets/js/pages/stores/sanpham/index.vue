<template>
    <v-card>
        <v-card-title primary-title class="grey lighten-4">
            <h3 class="headline mb-0">{{ $t('list') }} Sản phẩm</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-btn color="primary" :to="{name: 'stores.sanpham.create'}">
            <v-icon dark left>thumb_up</v-icon>{{ $t('create') }}
        </v-btn>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Tìm kiếm"
            single-line
            hide-details
        ></v-text-field>
        <v-divider></v-divider>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            :pagination.sync="pagination"
            :total-items="totalDesserts"
            :loading="loading"
            :search="search"
            select-all
            item-key="id"
            class="elevation-1"
        >
            <template slot="headers" slot-scope="props">
                <tr>
                    <th>
                        <v-checkbox
                            :input-value="props.all"
                            :indeterminate="props.indeterminate"
                            primary
                            hide-details
                            @click.native="toggleAll"
                        ></v-checkbox>
                    </th>
                    <th
                        v-for="header in props.headers"
                        :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                        @click="changeSort(header.value)"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                </tr>
            </template>
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>
                        <v-checkbox
                            :input-value="props.selected"
                            primary
                            hide-details
                        ></v-checkbox>
                    </td>
                    <td>{{ props.item.ma_sanpham }}</td>
                    <td class="text-xs-right">{{ props.item.ten_sanpham }}</td>
                    <td class="text-xs-right">{{ props.item.ten_hoatchat }}</td>
                    <td class="text-xs-right">{{ props.item.nongdo_hamluong }}</td>
                    <td class="text-xs-right">{{ props.item.sokiemsoat }}</td>
                    <td class="text-xs-right">{{ props.item.quycachdonggoi }}</td>
                </tr>
            </template>
            <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                    Sorry, nothing to display here :(
                </v-alert>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    name: 'stores-sanpham-index-view',
    data: () => ({
        search: '',
        totalDesserts: 0,
        loading: true,
        pagination: {},
        selected: [],
        headers: [
            {
                text: 'Dessert (100g serving)',
                align: 'left',
                value: 'name'
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: []
    }),
    // watch: {
    //     pagination: {
    //         handler () {
    //             this.getDataFromApi()
    //             // .then(resp => {
    //             //     this.desserts = resp.data
    //             //     this.totalDesserts = resp.total
    //             // })
    //     },
    //     deep: true
    //     }
    // },
    // mounted () {
    //     this.getDataFromApi()
    //     .then(data => {
    //         this.desserts = data.items
    //         this.totalDesserts = data.total
    //     })
    // },
    mounted() {
        this.getDataFromApi()
    },
    methods: {
        toggleAll () {
            if (this.selected.length) this.selected = []
            else this.selected = this.desserts.slice()
        },
        changeSort (column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        getDataFromApi () {
            this.loading = true
            axios.get('/api/v1/stores/sanpham')
            .then(resp => {
                console.log(resp)
                console.log(resp.data)
                this.desserts = resp.data.data
                this.totalDesserts = resp.data.total

                this.loading = false
            })
            .catch(function (resp) {
                console.log(resp);
                alert("Could not load sản phẩm");

                this.loading = false
            });

            // return new Promise((resolve, reject) => {
            //     const { sortBy, descending, page, rowsPerPage } = this.pagination

            //     let items = this.getDesserts()
            //     const total = items.length

            //     if (this.pagination.sortBy) {
            //     items = items.sort((a, b) => {
            //         const sortA = a[sortBy]
            //         const sortB = b[sortBy]

            //         if (descending) {
            //         if (sortA < sortB) return 1
            //         if (sortA > sortB) return -1
            //         return 0
            //         } else {
            //         if (sortA < sortB) return -1
            //         if (sortA > sortB) return 1
            //         return 0
            //         }
            //     })
            //     }

            //     if (rowsPerPage > 0) {
            //     items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            //     }

            //     setTimeout(() => {
            //     this.loading = false
            //     resolve({
            //         items,
            //         total
            //     })
            //     }, 1000)
            // })
        },
    }
}
</script>

<style>

</style>
