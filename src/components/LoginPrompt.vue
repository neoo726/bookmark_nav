<template>
    <teleport to="body">
      <div class="fixed inset-0 z-50" @click.self="$emit('close')">
        <div 
          class="absolute bg-[#69bfff] p-4 rounded-lg shadow-lg w-64"
          :style="{ left: position.x + 'px', top: position.y + 'px' }"
        >
          <p class="text-white mb-4">登录后才能创建导航</p>
          <div class="flex justify-end space-x-4">
            <button @click="$emit('close')" class="text-white hover:font-bold transition-all duration-200">
              以后
            </button>
            <button @click="$emit('login')" class="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors font-bold">
              登录
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </template>
  
  <script>
  export default {
    name: 'LoginPrompt',
    props: {
      position: {
        type: Object,
        required: true
      }
    },
    emits: ['close', 'login']
  }
  </script>