import React from 'react';
import Modal from './Modal';
import styles from '../styles/modals/ActionModal.module.css';
import { ActionModalProps } from '../types/ActionModal.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  detail,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        {detail && <p className={styles.detail}>{detail}</p>}
        <div className={styles.actions}>
          <button className={styles.closeButton} onClick={onClose} type="button">
            {STRING_CONSTANTS.BUTTONS.CLOSE}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
