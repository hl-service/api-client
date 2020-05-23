<template>
    <div>
        <div class="header mb-4">
            <h2>Добавить статью</h2>
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

        <div>
            <div class="form-group">
                <label for="title">Заголовок статьи</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Содержимое</label>

                <textarea
                    id="description"
                    rows="10"
                    class="form-control"
                    v-model="description"
                ></textarea>
            </div>

            <button @click="onCreate" class="btn btn-primary">
                Добавить
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
            title: '',
            description: '',
            errorMessage: '',
        }
    },

    methods: {
        onCreate() {
            axios
                .post('/articles', {
                    title: this.title,
                    description: this.description,
                })
                .then(response => {
                    this.showSuccessMessage()

                    this.$router.push({
                        name: 'articles.show',
                        params: {
                            id: response.data.data._id,
                        },
                    })
                })
                .catch(error => {
                    this.errorMessage = error.response
                        ? error.response.data.message
                        : 'Произошла ошибка. Попробуйте позже.'
                })
        },

        showSuccessMessage() {
            Swal.fire({
                title: 'Статья успешно создана!',
                icon: 'success',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
            })
        },
    },
}
</script>
