<template>
    <v-card>
        <v-card-title primary-title class="grey lighten-4">
            <h3 class="headline mb-0">{{ $t('create') }} Sản phẩm</h3>
        </v-card-title>
        <v-divider></v-divider>
        
        <form>
        <v-container fluid>
             <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field
                        v-validate="'required|max:50'"
                        v-model="ma_sanpham"
                        :counter="10"
                        :error-messages="errors.collect('ma_sanpham')"
                        label="dsads"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-validate="'required|email'"
                        v-model="email"
                        :error-messages="errors.collect('email')"
                        label="E-mail"
                        data-vv-name="email"
                        required
                    ></v-text-field>
                    <v-select
                        v-validate="'required'"
                        :items="items"
                        v-model="select"
                        :error-messages="errors.collect('select')"
                        label="Select"
                        data-vv-name="select"
                        required
                    ></v-select>
                    <v-checkbox
                        v-validate="'required'"
                        v-model="checkbox"
                        :error-messages="errors.collect('checkbox')"
                        value="1"
                        label="Option"
                        data-vv-name="checkbox"
                        type="checkbox"
                        required
                    ></v-checkbox>
                </v-flex>
             </v-layout>
        </v-container>







        <v-divider></v-divider>
            <v-btn :to="{name: 'stores.sanpham.index'}" color="orange darken-2" dark><v-icon dark left>arrow_back</v-icon>{{ $t('back') }}</v-btn>
            <v-btn @click="clear" dark><v-icon dark left>remove_circle</v-icon>{{ $t('clear') }}</v-btn>
            <v-btn @click="submit" color="primary" dark>{{ $t('submit') }}<v-icon dark right>check_circle</v-icon></v-btn>
        </form>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    name: 'stores-sanpham-create-view',
    data: () => ({
        ma_sanpham: '',
        email: '',
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4'
        ],
        checkbox: null,
        dictionary: {
            attributes: {
                email: 'E-mail Address'
                // custom attributes
            },
            custom: {
                ma_sanpham: {
                    required: () => 'Họ tên can not be empty',
                    max: 'The name field may not be greater than 10 characters'
                    // custom messages
                },
                select: {
                    required: 'Select field is required'
                }
            }
        }
    }),
    mounted () {
      this.$validator.localize('vi', this.dictionary)
    },
    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      }
    }
}
</script>

<style>

</style>
