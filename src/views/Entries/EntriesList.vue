<template>
    <div>
        <div class="header mb-4">
            <h2>История запросов</h2>
        </div>

        <div
            v-if="errorMessage"
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
        >
            <strong>Ошибка:</strong> {{ errorMessage }}
            <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
                @click="errorMessage = ''"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="row row-cols-1">
            <div v-for="entry in entries" :key="entry._id" class="col mb-4">
                <EntryCard :text="entry.text" :result="entry.result" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import EntryCard from '@/components/EntryCard.vue'

export default {
    name: 'Home',

    components: {
        EntryCard,
    },

    data() {
        return {
            entries: [],
            errorMessage: '',
        }
    },

    created() {
        axios
            .get('/entries')
            .then(response => {
                this.entries = response.data.data
            })
            .catch(error => {
                this.errorMessage = error.response
                    ? error.response.data.message
                    : 'Произошла ошибка. Попробуйте позже.'
            })
    },
}
</script>
