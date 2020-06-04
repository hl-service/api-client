<template>
    <div class="card">
        <div class="card-body">
            <p class="card-text">
                <strong>Текст:</strong>
                {{ text }}
            </p>

            <strong>Тональность:</strong>
            <span class="card-text text-danger" v-if="resultType === -1">
                отрицательная ({{ roundedResult }}%)
            </span>

            <span class="card-text text-muted" v-if="resultType === 0">
                нейтральная ({{ roundedResult }}%)
            </span>

            <span class="card-text text-success" v-if="resultType === 1">
                положительная ({{ roundedResult }}%)
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },

        result: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            resultType: 0,
            roundedResult: 0,
        }
    },

    mounted() {
        if (this.result > 0.7) {
            this.resultType = 1 // positive
        }

        if (this.result >= 0.4 && this.result <= 0.7) {
            this.resultType = 0 // neutral
        }

        if (this.result < 0.4) {
            this.resultType = -1 // negative
        }

        this.roundedResult = (this.result * 100).toFixed(0)
    },
}
</script>
