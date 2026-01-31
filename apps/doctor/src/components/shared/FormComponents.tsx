import React, { memo, ReactNode } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface QuickAddChipProps {
  label: string;
  onClick: () => void;
  styles: CSSModuleClasses;
}

/**
 * QuickAddChip - A chip for quick-add functionality
 */
export const QuickAddChip: React.FC<QuickAddChipProps> = memo(({ label, onClick, styles }) => (
  <button className={styles.quickAddChip} onClick={onClick}>
    <span className={`${styles.materialIcon} ${styles.chipIcon}`}>add</span>
    {label}
  </button>
));

QuickAddChip.displayName = 'QuickAddChip';

interface QuickAddListProps {
  items: string[];
  onAdd: (item: string) => void;
  styles: CSSModuleClasses;
  containerClassName?: string;
}

/**
 * QuickAddList - List of quick-add chips
 */
export const QuickAddList: React.FC<QuickAddListProps> = memo(({ 
  items, 
  onAdd, 
  styles,
  containerClassName 
}) => (
  <div className={containerClassName || styles.quickAddSection}>
    {items.map(item => (
      <QuickAddChip key={item} label={item} onClick={() => onAdd(item)} styles={styles} />
    ))}
  </div>
));

QuickAddList.displayName = 'QuickAddList';

interface TagListProps {
  tags: string[];
  onRemove?: (tag: string) => void;
  styles: CSSModuleClasses;
  removable?: boolean;
}

/**
 * TagList - List of tags with optional remove button
 */
export const TagList: React.FC<TagListProps> = memo(({ 
  tags, 
  onRemove, 
  styles,
  removable = true 
}) => {
  if (tags.length === 0) return null;
  
  return (
    <div className={styles.tagsContainer}>
      {tags.map(tag => (
        <div key={tag} className={styles.tag}>
          {tag}
          {removable && onRemove && (
            <button className={styles.tagRemove} onClick={() => onRemove(tag)}>
              <span className={styles.materialIcon}>close</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
});

TagList.displayName = 'TagList';

interface ListItemWithActionsProps {
  name: string;
  details?: string;
  onEdit?: () => void;
  onRemove?: () => void;
  styles: CSSModuleClasses;
}

/**
 * ListItemWithActions - An item with edit/remove actions
 */
export const ListItemWithActions: React.FC<ListItemWithActionsProps> = memo(({ 
  name, 
  details, 
  onEdit, 
  onRemove, 
  styles 
}) => (
  <div className={styles.medItem}>
    <div className={styles.medItemContent} onClick={onEdit}>
      <div className={styles.medItemName}>{name}</div>
      {details && <div className={styles.medItemDetails}>{details}</div>}
    </div>
    {onEdit && (
      <button className={styles.medItemEdit} onClick={onEdit}>
        <span className={styles.materialIcon}>edit</span>
      </button>
    )}
    {onRemove && (
      <button className={styles.medItemRemove} onClick={onRemove}>
        <span className={styles.materialIcon}>delete</span>
      </button>
    )}
  </div>
));

ListItemWithActions.displayName = 'ListItemWithActions';

interface ItemListWithActionsProps {
  items: Array<{ id: string; name: string; details?: string }>;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  styles: CSSModuleClasses;
  containerClassName?: string;
}

/**
 * ItemListWithActions - List of items with edit/remove actions
 */
export const ItemListWithActions: React.FC<ItemListWithActionsProps> = memo(({ 
  items, 
  onEdit, 
  onRemove, 
  styles,
  containerClassName 
}) => (
  <div className={containerClassName || styles.prescriptionList || styles.medicationsList}>
    {items.map(item => (
      <ListItemWithActions
        key={item.id}
        name={item.name}
        details={item.details}
        onEdit={onEdit ? () => onEdit(item.id) : undefined}
        onRemove={onRemove ? () => onRemove(item.id) : undefined}
        styles={styles}
      />
    ))}
  </div>
));

ItemListWithActions.displayName = 'ItemListWithActions';

interface TextAreaCardProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  styles: CSSModuleClasses;
}

/**
 * TextAreaCard - Card with a title and textarea
 */
export const TextAreaCard: React.FC<TextAreaCardProps> = memo(({ 
  title, 
  value, 
  onChange, 
  placeholder, 
  rows = 5, 
  styles 
}) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>{title}</h2>
    </div>
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
));

TextAreaCard.displayName = 'TextAreaCard';

interface InputFieldCardProps {
  title: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  styles: CSSModuleClasses;
}

/**
 * InputFieldCard - Card with a title and input field
 */
export const InputFieldCard: React.FC<InputFieldCardProps> = memo(({ 
  title, 
  label,
  type = 'text',
  value, 
  onChange, 
  placeholder, 
  styles 
}) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>{title}</h2>
    </div>
    {label && <div className={styles.sectionLabel}>{label}</div>}
    <input
      type={type}
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
));

InputFieldCard.displayName = 'InputFieldCard';

interface CardWithHeaderActionProps {
  title: string;
  actionLabel: string;
  actionIcon?: string;
  onAction: () => void;
  children: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * CardWithHeaderAction - Card with header that has an action button
 */
export const CardWithHeaderAction: React.FC<CardWithHeaderActionProps> = memo(({ 
  title, 
  actionLabel, 
  actionIcon = 'add',
  onAction, 
  children, 
  styles 
}) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <button className={styles.addButton} onClick={onAction}>
        <span className={`${styles.materialIcon} ${styles.addIcon}`}>{actionIcon}</span>
        {actionLabel}
      </button>
    </div>
    {children}
  </div>
));

CardWithHeaderAction.displayName = 'CardWithHeaderAction';

interface EditableHeaderCardProps {
  title: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  editLabel?: string;
  saveLabel?: string;
  children: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * EditableHeaderCard - Card with edit/save toggle button in header
 */
export const EditableHeaderCard: React.FC<EditableHeaderCardProps> = memo(({ 
  title, 
  isEditing, 
  onToggleEdit, 
  editLabel = 'Edit',
  saveLabel = 'Save',
  children, 
  styles 
}) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <button className={styles.editButton} onClick={onToggleEdit}>
        <span className={styles.materialIcon}>
          {isEditing ? 'check' : 'edit'}
        </span>
        {isEditing ? saveLabel : editLabel}
      </button>
    </div>
    {children}
  </div>
));

EditableHeaderCard.displayName = 'EditableHeaderCard';

interface SectionSeparatorProps {
  styles: CSSModuleClasses;
}

/**
 * SectionSeparator - Visual separator between sections
 */
export const SectionSeparator: React.FC<SectionSeparatorProps> = memo(({ styles }) => (
  <div className={styles.sectionSeparator}></div>
));

SectionSeparator.displayName = 'SectionSeparator';
