import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useNewCustomerModal } from '../context/NewCustomerModalContext';
import { NewCustomerScreen } from '../screens/NewCustomerScreen';

export function NewCustomerModal() {
  const { isOpen, close } = useNewCustomerModal();

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <View style={styles.container}>
        <NewCustomerScreen onClose={close} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
