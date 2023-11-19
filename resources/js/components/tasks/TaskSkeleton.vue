<script setup lang="ts">

</script>

<template>
    <div class="task-container">
        <div class="title-container">
            <h4 class="title">
                
            </h4>
            <button class="delete-btn">&times;</button>
        </div>
        <div class="body">
            <p class="desc"></p>
            <p class="desc"></p>
            <div class="details">
                <div class="details-row">
                    <small></small>
                    <small></small>
                </div>
                <div class="details-row">
                    <small></small>
                    <small></small>
                </div>
                <div class="details-row">
                    <small></small>
                    <small></small>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-container {
    @apply border border-solid border-t-4 border-slate-400 p-3 rounded-md
    flex flex-col gap-2 hover:cursor-wait animate-pulse;

    .title-container {
        @apply flex justify-between items-center gap-2;
        .title {
            @apply font-bold text-base truncate m-0 bg-gray-300 w-full h-4;
        }

        .delete-btn {
            @apply flex-shrink-0 border-none w-6 h-6 flex justify-center items-center rounded-full text-gray-700 bg-gray-100;
        }
    }

    .body {
        @apply flex flex-col gap-2;

        .desc {
            @apply m-0 text-sm text-gray-800 line-clamp-4 w-full h-2 bg-gray-200;
        }

        .details {
            .details-row {
                @apply flex justify-between;

                small {
                    @apply text-[10px] text-gray-500 h-1 w-16 bg-gray-200 mt-1;
                }
            }
        }
    }
}
</style>
