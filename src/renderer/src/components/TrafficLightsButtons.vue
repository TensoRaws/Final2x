<script setup lang="ts">
import { IpcChannelSend } from '@shared/const/ipc'
import { onMounted, onUnmounted, ref } from 'vue'

const isFocus = ref(true)

function handleFocus(): void {
  isFocus.value = true
}

function handleBlur(): void {
  isFocus.value = false
}

onMounted(() => {
  window.addEventListener('focus', handleFocus)
  window.addEventListener('blur', handleBlur)
})

onUnmounted(() => {
  window.removeEventListener('focus', handleFocus)
  window.removeEventListener('blur', handleBlur)
})

function handleClose(): void {
  window.electron.ipcRenderer.send(IpcChannelSend.CLOSE)
}

function handleMinimize(): void {
  window.electron.ipcRenderer.send(IpcChannelSend.MINIMIZE)
}

function handleMaximize(): void {
  window.electron.ipcRenderer.send(IpcChannelSend.MAXIMIZE)
}
</script>

<template>
  <div class="container">
    <div class="drag-area" />
    <div v-if="!isFocus">
      <div class="example">
        <div class="traffic-lights">
          <button
            id="close"
            class="traffic-light traffic-light-close"
            @click="handleClose"
          />
          <button
            id="minimize"
            class="traffic-light traffic-light-minimize"
            @click="handleMinimize"
          />
          <button
            id="maximize"
            class="traffic-light traffic-light-maximize"
            @click="handleMaximize"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="example focus">
        <div class="traffic-lights">
          <button
            id="close"
            class="traffic-light traffic-light-close"
            @click="handleClose"
          />
          <button
            id="minimize"
            class="traffic-light traffic-light-minimize"
            @click="handleMinimize"
          />
          <button
            id="maximize"
            class="traffic-light traffic-light-maximize"
            @click="handleMaximize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$close-red: #ff6159;
$close-red-active: #bf4942;
$close-red-icon: #4d0000;
$close-red-icon-active: #190000;

$minimize-yellow: #ffbd2e;
$minimize-yellow-active: #bf8e22;
$minimize-yellow-icon: #995700;
$minimize-yellow-icon-active: #592800;

$maximize-green: #28c941;
$maximize-green-active: #1d9730;
$maximize-green-icon: #006500;
$maximize-green-icon-active: #003200;

$disabled-gray: #ddd;

.traffic-lights {
  // position: absolute;
  top: 1px;
  left: 8px;

  .focus &,
  &:hover,
  &:active {
    > .traffic-light-close {
      background-color: $close-red;

      &:active:hover {
        background-color: $close-red-active;
      }
    }
    > .traffic-light-minimize {
      background-color: $minimize-yellow;

      &:active:hover {
        background-color: $minimize-yellow-active;
      }
    }
    > .traffic-light-maximize {
      background-color: $maximize-green;

      &:active:hover {
        background-color: $maximize-green-active;
      }
    }
  }

  > .traffic-light {
    &:before,
    &:after {
      visibility: hidden;
    }
  }

  &:hover,
  &:active {
    > .traffic-light {
      &:before,
      &:after {
        visibility: visible;
      }
    }
  }
}

.traffic-light {
  border-radius: 100%;
  padding: 0;
  height: 12px;
  width: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  margin-right: 3.5px;
  background-color: $disabled-gray;
  position: relative;
  outline: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 1px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  &-close {
    &:before,
    &:after {
      background-color: $close-red-icon;
      width: 8px;
      height: 1px;
    }
    &:before {
      transform: rotate(45deg); // translate(-0.5px, -0.5px);
    }
    &:after {
      transform: rotate(-45deg); // translate(0.5px, -0.5px);
    }
    &:active:hover:before,
    &:active:hover:after {
      background-color: $close-red-icon-active;
    }
  }

  &-minimize {
    &:before {
      background-color: $minimize-yellow-icon;
      width: 8px;
      height: 1px;
      //transform: translateY(-0.5px);
    }
    &:active:hover:before {
      background-color: $minimize-yellow-icon-active;
    }
  }

  &-maximize {
    &:before {
      background-color: $maximize-green-icon;
      width: 6px;
      height: 6px;
    }
    &:after {
      background-color: $maximize-green;
      width: 10px;
      height: 2px;
      transform: rotate(45deg);
    }
    &:active:hover:before {
      background-color: $maximize-green-icon-active;
    }
    &:active:hover:after {
      background-color: $maximize-green-active;
    }
  }
}

// Example Styles
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 100;
}

h1,
h2 {
  font-weight: 100;
}

h2 {
  margin: 0 0 10px;
}

.example {
  margin: 0 0 30px;
}

.container {
  position: fixed;
  height: 30px;
  width: 50px;
  left: 10px;
}

.drag-area {
  -webkit-app-region: drag;
  position: fixed;
  height: 30px;
  width: 100%;
  left: 60px;
}
</style>
