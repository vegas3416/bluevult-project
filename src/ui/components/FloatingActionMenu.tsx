import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

type ActionItem = {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type FloatingActionMenuProps = {
  visible: boolean;
  onClose: () => void;
  actions: ActionItem[];
  variant?: 'home' | 'customer';
};

export function FloatingActionMenu({
  visible,
  onClose,
  actions,
  variant = 'home',
}: FloatingActionMenuProps) {
  const orderedActions =
    variant === 'customer'
      ? [
          { item: actions.find(a => a.key === 'image'), style: styles.customerTop },
          { item: actions.find(a => a.key === 'job'), style: styles.customerBottomLeft },
          { item: actions.find(a => a.key === 'calendar'), style: styles.customerBottomRight },
        ]
      : [
          { item: actions.find(a => a.key === 'message'), style: styles.topLeft },
          { item: actions.find(a => a.key === 'job'), style: styles.topRight },
          { item: actions.find(a => a.key === 'camera'), style: styles.centerLeft },
          { item: actions.find(a => a.key === 'calendar'), style: styles.centerRight },
        ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay} pointerEvents="box-none">
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.clusterWrap} pointerEvents="box-none">
          <View
            style={variant === 'customer' ? styles.customerAnchor : styles.clusterAnchor}
            pointerEvents="box-none"
          >
            {orderedActions.map(({ item, style }) => {
              if (!item) return null;

              return (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    onClose();
                    item.onPress();
                  }}
                  style={[styles.actionButton, style]}
                >
                  <Ionicons name={item.icon} size={20} color="#111827" />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  clusterWrap: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 34,
  },

  clusterAnchor: {
    width: 220,
    height: 140,
    position: 'relative',
  },

  customerAnchor: {
    width: 180,
    height: 140,
    position: 'relative',
  },

  actionButton: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  // Home 4-icon cluster
  topLeft: {
    top: 0,
    left: 44,
  },
  topRight: {
    top: 0,
    right: 44,
  },
  centerLeft: {
    top: 58,
    left: 0,
  },
  centerRight: {
    top: 58,
    right: 0,
  },

  // Customer 3-icon cluster
  customerTop: {
    top: 0,
    left: 64,
  },
  customerBottomLeft: {
    top: 58,
    left: 14,
  },
  customerBottomRight: {
    top: 58,
    right: 14,
  },
});
