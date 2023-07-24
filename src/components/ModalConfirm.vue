<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <div class="modal-content">
        <p>{{ message }}</p>
        <button @click="onCancel" class="modal-cancel-button">{{$t('modal.cancel')}}</button>
        <button @click="onConfirm" class="modal-confirm-button">{{$t('modal.confirm')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  text-align: center;
}

.modal-confirm-button {
  background-color: #70bcef;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  transition: all 0.2s ease-in-out;
}

.modal-confirm-button:hover {
  background-color: #70ef79;
  color: #fff;
  border: 1px solid transparent;
}

.modal-cancel-button {
  background-color: #e67984;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
}

.modal-cancel-button:hover {
  background-color: #e14454;
  color: #fff;
  border: 1px solid transparent;
}

.modal-content p {
  margin-bottom: 16px;
}
</style>
