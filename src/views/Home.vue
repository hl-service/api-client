<template>
    <div>
        <div class="header mb-4">
            <h2>Список статей</h2>
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
            <div
                v-for="article in articles"
                :key="article._id"
                class="col mb-4"
            >
                <div class="card">
                    <div class="card-body">
                        <router-link
                            class="h5 card-title"
                            :to="{
                                name: 'articles.show',
                                params: { id: article._id },
                            }"
                        >
                            {{ article.title }}
                        </router-link>
                        <p class="card-text mt-2">
                            {{ article.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',

    data() {
        return {
            articles: [],
            errorMessage: '',
        }
    },

    created() {
        axios
            .get('/articles')
            .then(response => {
                this.articles = response.data.data

                if (response.data.data.success) {
                    alert('success')
                }
            })
            .catch(error => {
                this.errorMessage = error.response
                    ? error.response.data.message
                    : 'Произошла ошибка. Попробуйте позже.'
            })
    },
}
</script>
