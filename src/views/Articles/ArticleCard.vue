<template>
    <div>
        <div class="header mb-4">
            <h2>Статья - {{ article.title }}</h2>
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

        <div v-if="Object.keys(article).length > 0">
            <p class="lead">
                {{ article.description }}
            </p>

            <router-link
                class="btn btn-primary"
                :to="{ name: 'articles.edit', params: { id } }"
            >
                Редактировать
            </router-link>

            <button class="btn btn-danger ml-2" @click="onDeleteClick">
                Удалить
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            id: null,
            article: {},
            errorMessage: '',
        }
    },

    created() {
        this.id = this.$route.params.id
        axios
            .get(`/articles/${this.id}`)
            .then(response => {
                this.article = response.data.data
            })
            .catch(error => {
                this.errorMessage = error.response
                    ? error.response.data.message
                    : 'Произошла ошибка. Попробуйте позже.'
            })
    },

    methods: {
        onDeleteClick() {
            this.showDeleteConfirmationModal()
        },

        onDeleteConfirmed() {
            Swal.fire({
                title: 'Статья успешно удалена!',
                icon: 'success',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
            })
        },

        async showDeleteConfirmationModal() {
            const { isConfirmed } = await Swal.fire({
                text: 'Вы уверены, что хотите удалить статью?',
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonText: 'Удалить',
                showCancelButton: true,
                cancelButtonText: 'Отмена',
                showCloseButton: true,
            })

            if (isConfirmed) {
                axios
                    .delete(`/articles/${this.id}`)
                    .then(() => {
                        this.onDeleteConfirmed()
                        this.$router.push({
                            name: 'home',
                        })
                    })
                    .catch(error => {
                        this.errorMessage = error.response
                            ? error.response.data.message
                            : 'Произошла ошибка. Попробуйте позже.'
                    })
            }
        },
    },
}
</script>
