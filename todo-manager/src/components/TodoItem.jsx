import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  // Состояния для режима редактирования и текста
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Сохранение изменений
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
    } else {
      setEditText(task.text); // возвращаем старый текст, если ввели пустоту
    }
    setIsEditing(false);
  };

  // Сохранение по нажатию Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      borderBottom: '1px solid #eee'
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      
      {/* Условный рендеринг: инпут или текст */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave} // сохраняем при клике вне поля
          onKeyDown={handleKeyDown}
          autoFocus // автоматически ставим курсор
          style={{
            flex: 1,
            padding: '4px',
            fontSize: '16px'
          }}
        />
      ) : (
        <span 
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : 'inherit',
            cursor: 'pointer' // курсор подсказывает, что с элементом можно взаимодействовать
          }}
          title="Двойной клик для редактирования"
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;