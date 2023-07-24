<template>
  <div class="preloader">
    <div class="preloader-spinner"></div>
  </div>
</template>

<style>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.preloader-spinner {
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-top: 3px solid #70bcef;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
