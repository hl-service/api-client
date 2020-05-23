<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light mb-5">
        <div class="container">
            <router-link class="navbar-brand" to="/">Service</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar"
                aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'home' }">
                            Главная
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'articles.create' }"
                        >
                            Добавить статью
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
