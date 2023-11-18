<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod';
import { TaskSchema, TaskStatus, type Task } from '@/declarations';
import { toRefs } from 'vue';

const emits = defineEmits(['submit']);
const props = defineProps<{
    isPending: boolean,
    type: 'Create' | 'Update'
}>()
const { isPending } = toRefs(props);

const [zodPlugin, submitHandler] = createZodPlugin(TaskSchema, (formData: Task) => {
    emits('submit', formData);
})

</script>

<template>
    <div class="content">
        <FormKit type="form" @submit="submitHandler" :plugins="[zodPlugin]" :actions="false">
            <div class="form-row">
                <div class="form-label">
                    <label>Title <span class="required">*</span></label>
                    <small>0/100</small>
                </div>
                <FormKit
                    type="text"
                    name="title"
                    :max="100"
                    :min="3"
                />
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>Description</label>
                    <small>0/1000</small>
                </div>
                <FormKit
                    type="textarea"
                    name="description"
                />
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>Status</label>
                </div>
                <FormKit
                    type="radio"
                    name="status"
                    :value="TaskStatus.todo"
                    :options="Object.values(TaskStatus)"
                />
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>Due Date</label>
                </div>
                <FormKit
                    type="date"
                    name="due_at"
                />
            </div>
            <div class="form-action-container">
                <button type="button">Discard</button>
                <FormKit
                    type="submit"
                    :label="type"
                    :disabled="isPending"
                />
            </div>
        </FormKit>
    </div>
</template>

<style scoped lang="scss">
.content {
    @apply flex justify-center items-center;

    :deep(.formkit-form) {
        @apply max-w-md w-full flex flex-col gap-5;
    }

    .form-row {
        @apply flex flex-col gap-1;

        .form-label {
            @apply flex justify-between m-0;

            label {
                @apply uppercase font-bold text-xs tracking-widest text-gray-600;

                .required {
                    @apply text-red-500;
                }
            }

            small {
                @apply text-xs text-gray-400;
            }
        }
    }

    :deep(.formkit-input) {
        &:not([type=radio]) {
            @apply w-full border border-solid rounded-[4px] border-gray-300 p-2 outline-blue-400;
        }
    }

    :deep(.formkit-options) {
        @apply list-none p-0 flex gap-5;

        .formkit-option {
            .formkit-wrapper {
                @apply flex gap-2 items-center;

                .formkit-inner {
                    @apply relative top-[2px];
                }
            }
        }
    }

    :deep(.formkit-messages) {
        @apply list-none p-0 m-0 mt-1 flex flex-col text-red-500 text-xs;
    }

    .form-action-container {
        @apply flex gap-5;

        button, .formkit-outer {
            @apply w-1/2;
        }
    }
}
</style>