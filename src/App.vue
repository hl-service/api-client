<template>
    <div id="app">
        <Navbar />
        <main role="main" class="container">
            <router-view />
        </main>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
}
</script>
