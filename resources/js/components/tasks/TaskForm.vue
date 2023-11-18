<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod';
import { TaskSchema, TaskStatus, type Task } from '@/declarations';
import { toRefs, ref } from 'vue';
import { watchEffect } from 'vue';
import moment from 'moment';

const emits = defineEmits(['submit']);
const props = defineProps<{
    isPending: boolean,
    type: 'Create' | 'Update',
    task?: Task
}>()
const { isPending } = toRefs(props);

const [zodPlugin, submitHandler] = createZodPlugin(TaskSchema, (formData: Task) => {
    emits('submit', formData);
});

const title = ref(props.task?.title);
const description = ref(props.task?.description);
const status = ref(props.task?.status);
const due = ref(props.task?.due_at.toString());

watchEffect(() => {
    if (!props.task) return;

    title.value = props.task.title;
    description.value = props.task.description || '';
    status.value = props.task.status;
    due.value = moment(props.task.due_at.toString()).format('YYYY-MM-DD');
});

</script>

<template>
    <div class="content">
        <FormKit type="form" @submit="submitHandler" :plugins="[zodPlugin]" :actions="false">
            <div class="form-row">
                <div class="form-label">
                    <label>Title <span class="required">*</span></label>
                    <small>{{ title?.length || 0 }}/100</small>
                </div>
                <FormKit
                    type="text"
                    name="title"
                    :max="100"
                    :min="3"
                    v-model="title"
                />
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>Description</label>
                    <small>{{ description?.length || 0 }}/1000</small>
                </div>
                <FormKit
                    type="textarea"
                    name="description"
                    :max="1000"
                    v-model="description"
                />
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>Status <span class="required">*</span></label>
                </div>
                <FormKit
                    type="radio"
                    name="status"
                    :value="TaskStatus.todo"
                    :options="Object.values(TaskStatus)"
                    v-model="status"
                />
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>Due Date <span class="required">*</span></label>
                </div>
                <FormKit
                    type="date"
                    name="due_at"
                    v-model="due"
                />
            </div>
            <div class="form-action-container">
                <button type="button" class="form-btn cancel-btn">Cancel</button>
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
            @apply w-full border border-solid rounded-[4px] border-gray-300 p-2 outline-blue-300 text-gray-500;
        }

        &[type=radio] {
            @apply appearance-none rounded-full p-[5px] border-4 border-solid border-gray-200 bg-gray-400;
            &:checked {
                @apply  border-blue-300 bg-blue-500;
            }
        }

        &[name=description] {
            @apply h-[150px] resize-none;
        }
    }

    :deep(.formkit-options) {
        @apply list-none p-0 flex gap-5 m-0;

        .formkit-option {
            .formkit-wrapper {
                @apply flex gap-2 items-center;

                .formkit-label {
                    @apply text-gray-500;
                }

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
        @apply flex gap-5 mt-2;

        .form-btn, .formkit-outer {
            @apply w-1/2 rounded-md outline-none uppercase tracking-wide;
        }

        :deep(.formkit-input[type="submit"]) {
            @apply bg-blue-500 border-2 border-blue-500 border-solid text-white uppercase tracking-wide hover:bg-blue-400 hover:border-blue-400;
        }

        .cancel-btn {
            @apply border-2 border-solid border-blue-400 bg-white text-blue-500 hover:bg-gray-50;
        }
    }
}
</style>