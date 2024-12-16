<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import { DefaultApi, Configuration } from '../generated'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TfQuestionOption from '@/components/TfQuestionOption.vue'
import QuestionList from '@/components/QuestionList.vue'
import { useTimerStore } from '@/stores/timer'
import router from '@/router'

const route = useRoute()
const question = ref<string | undefined>(undefined)
const list = ref<string[]>([])
const errorMessage = ref<string | undefined>(undefined)
const answer = ref<string | undefined>(undefined)
const commentary = ref<string | undefined>(undefined)
const intervalId = ref<number | undefined>(undefined)
const Dialog = ref<boolean>(false)

const timerstore = useTimerStore()

async function fetchQuestionData() {
    try {
        const config = new Configuration({
            basePath: 'http://localhost:8000'
        })
        const response = await new DefaultApi(config).readQuestionsQuestionsQuestionIdGet({
            questionId: Number(route.params.id)
        })

        question.value = response.questionText
        answer.value = response.correctAnswer
        list.value = response.choices
        commentary.value = response.commentary

        console.log('Question data:', response)
    } catch (error) {
        console.error('Error fetching question data:', error)
        errorMessage.value = '問題データの取得に失敗しました'
    }
}

onMounted(() => {
    fetchQuestionData()
})

onUnmounted(() => {
    if (intervalId.value) {
        clearInterval(intervalId.value)
    }
})

// idが変更された時
watch(
    () => route.params.id,
    () => {
        fetchQuestionData()
    }
)

// ダイアログが閉じられたら結果画面に遷移
watch(
    () => Dialog.value,
    (isDialogClosed) => {
        if (!isDialogClosed) {
            router.replace('/practice')
        }
    }
)

//問題数に達成すると結果画面に遷移
watch(
    () => route.params.id === '5',
    () => {
        timerstore.setFinishTime(timerstore.getPastTime()) // 保存
        Dialog.value = true
    }
)
</script>

<template>
    <NavHeader />
    <main>
        <div>
            <QuestionList v-if="question" :question="question" />
        </div>
        <div>
            <TfQuestionOption
                v-if="answer"
                :answer="answer"
                :list="list"
                :Commentary="commentary || ''"
                :id="Number(route.params.id)"
            />
        </div>
        <p v-if="errorMessage" style="color: #f6aa00; margin-top: 5px">{{ errorMessage }}</p>

        <v-dialog v-model="Dialog" width="auto">
            <v-card max-width="500" style="text-align: center;">
                <v-card-title class="centered-title">
                    問題数が上限に達しました
                </v-card-title>
                <v-card-text>
                    練習を終了します<br>
                    クリックでホーム画面に遷移します。
                </v-card-text>
                <v-card-actions>
                    <v-btn class="ms-auto" @click="Dialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </main>
</template>

<style scoped>
main {
    display: flex;
}

main > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.centered-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.2rem;
    background-color: auto;
    color: auto;
}

.ms-auto {
    margin-right: 105px;
}
</style>
