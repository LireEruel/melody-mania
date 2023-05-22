<script setup lang="ts">
import { ref } from 'vue'
import { signup } from '@/api/user/api_user'
import Swal from 'sweetalert2'
const input_email = ref('')
const input_password = ref('')
const input_password_confirm = ref('')
const input_name = ref('')

const onClickSignUpBtn = async () => {
  if (
    input_name.value &&
    input_password.value &&
    input_password_confirm.value &&
    input_email.value &&
    input_password.value == input_password_confirm.value
  ) {
    try {
      await signup(input_email.value, input_name.value, input_password.value)
      Swal.fire({
        title: 'Success',
        text: '회원가입을 완료하였습니다.',
        icon: 'success',
        confirmButtonText: '확인',
        heightAuto: false
      }).then(() => {
        window.location.replace('/signin')
      })
    } catch (e: any) {
      Swal.fire({
        title: 'Error!',
        text: e.response.data.detail,
        icon: 'error',
        confirmButtonText: '확인',
        heightAuto: false
      })
    }
  } else {
    Swal.fire({
      title: 'Error!',
      text: '입력 값을 다시 확인해주세요',
      icon: 'error',
      confirmButtonText: '확인',
      heightAuto: false
    })
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onClickSignUpBtn">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              type="email"
              autocomplete="email"
              v-model="input_email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
            >Nick Name</label
          >
          <div class="mt-2">
            <input
              v-model="input_name"
              autocomplete="name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              autocomplete="password"
              v-model="input_password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="check-password" class="block text-sm font-medium leading-6 text-gray-900"
              >Check password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              autocomplate="password-confirm"
              v-model="input_password_confirm"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign out
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        이미 회원이세요?
        <a href="/signin" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Get started</a
        >
      </p>
    </div>
  </div>
</template>
