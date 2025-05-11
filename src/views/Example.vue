<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { useToasterStore } from '@/stores/toaster';

import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import Modal from '@/components/ui/modal/Modal.vue';
import ModalHeader from '@/components/ui/modal/ModalHeader.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import Toaster from '@/components/ui/Toaster.vue';
import ToggleTheme from '@/components/ui/ToggleTheme.vue';

import { AlertCircle, Mail, Search, User } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const modalStore = useModalStore();
const toasterStore = useToasterStore();

const loading = ref<boolean>(true);

const loadTime = 5 * 1000;

const openModal = () => {
  modalStore.open('modal');
};

const successToast = () =>
  toasterStore.success({
    title: 'All right!',
    description: 'All in perfect state to you use',
  });

const warningToast = () =>
  toasterStore.warning({
    title: 'Warning!',
    description: 'Something wrong',
  });
const errorToast = () =>
  toasterStore.error({
    title: 'Problems!',
    description: 'Internal server error',
  });

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, loadTime);
});
</script>

<template>
  <div class="flex flex-col gap-8 p-2">
    <div class="flex flex-col gap-2 w-fit">
      <h1>Buttons:</h1>
      <Button variant="primary" size="lg">Primary Big</Button>
      <Button variant="secondary" size="md">Secondary Medium</Button>
      <Button variant="outline" size="sm">Outline Small</Button>
    </div>
    <div class="flex flex-col gap-2 w-fit">
      <h1>Inputs:</h1>
      <Input label="Email" :icon="Mail" size="lg" />
      <Input label="Username" :icon="User" size="md" />
      <Input label="Search" :icon="Search" size="sm" />
      <Input
        label="Mail"
        :icon="AlertCircle"
        size="sm"
        error="You do not make this correctly"
      />
    </div>
    <div class="flex flex-col gap-2 w-fit">
      <h1>Modal:</h1>
      <Modal name="modal">
        <ModalHeader
          title="Modal"
          label="Excepteur sint occaecat cupidatat non proident"
        />
      </Modal>
      <Button @click="openModal">Open</Button>
    </div>
    <div class="flex flex-col gap-2 w-fit">
      <Toaster />
      <Button
        @click="successToast"
        variant="outline"
        size="lg"
        color="bg-emerald-400/20 text-emerald-400 border-emerald-400"
        hover-color="hover:bg-emerald-50/10"
        >Success</Button
      >
      <Button
        @click="warningToast"
        variant="outline"
        size="lg"
        color="bg-amber-400/20 text-amber-400 border-amber-400"
        hover-color="hover:bg-amber-50/10"
        >Warning</Button
      >
      <Button
        @click="errorToast"
        variant="outline"
        size="lg"
        color="bg-red-400/20 text-red-400 border-red-400"
        hover-color="hover:bg-red-50/10"
        >Error</Button
      >
    </div>
    <div>
      <h1>Skeletons:</h1>
      <div class="flex flex-wrap gap-4 justify-between w-full">
        <div
          v-for="example in [1, 2, 3, 4, 5]"
          :key="example"
          class="flex flex-col gap-4 w-1/5"
        >
          <template v-if="loading">
            <Skeleton class="w-full h-56" />
            <Skeleton class="w-full h-12" />
          </template>
          <template v-else>
            <div class="rounded-lg bg-zinc-400 w-full h-56 flex justify-center items-center">
              <h1>Fake content</h1>
            </div>
            <div class="rounded-lg bg-zinc-400 w-full h-12 flex justify-center items-center">
              <p>Fake description</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <ToggleTheme />
  </div>
</template>
