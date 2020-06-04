<template>
    <div>
        <div class="header mb-4">
            <h2>Запросить анализ тональности текста</h2>
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
                <label for="text">Текст</label>

                <textarea
                    id="text"
                    rows="5"
                    class="form-control"
                    v-model="text"
                ></textarea>
            </div>

            <button @click="onCreate" class="btn btn-primary">
                Отправить
            </button>
        </div>

        <div v-if="output">
            <div class="header mt-4 mb-4">
                <h2>Результат</h2>
            </div>

            <EntryCard
                class="mt-2"
                v-if="output"
                :text="output.text"
                :result="output.result"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import EntryCard from '@/components/EntryCard.vue'

export default {
    components: {
        EntryCard,
    },

    data() {
        return {
            text: '',
            errorMessage: '',
            output: null,
        }
    },

    methods: {
        onCreate() {
            this.output = null

            axios
                .post('/entries', {
                    text: this.text,
                })
                .then(response => {
                    this.showSuccessMessage()

                    // Render output card
                    this.output = response.data.data
                })
                .catch(error => {
                    this.errorMessage = error.response
                        ? error.response.data.message
                        : 'Произошла ошибка. Попробуйте позже.'
                })
        },

        showSuccessMessage() {
            Swal.fire({
                title: 'Запрос успешно отправлен!',
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
