import { Check, Download, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

function LabResults({ results, onAdd, onUpdate, onDelete }) {
  const [newResult, setNewResult] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    if (!newResult.trim()) return;

    onAdd(newResult.trim());
    setNewResult('');
  }

  function beginEdit(result) {
    setEditingId(result.id);
    setEditingName(result.name);
  }

  function saveEdit(id) {
    if (!editingName.trim()) return;

    onUpdate(id, editingName.trim());
    setEditingId(null);
    setEditingName('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingName('');
  }

  return (
    <section className="labs card" aria-labelledby="labs-title">
      <div className="section-heading">
        <h2 id="labs-title">Lab Results</h2>
      </div>

      <form className="record-form record-form--lab" onSubmit={handleAdd}>
        <label>
          <span>Lab Result</span>
          <input
            value={newResult}
            onChange={(event) => setNewResult(event.target.value)}
            placeholder="Add lab result"
          />
        </label>
        <button className="action-button action-button--icon" type="submit" aria-label="Add lab result">
          <Plus size={16} aria-hidden="true" />
        </button>
      </form>

      <ul className="lab-list">
        {results.map((result) => (
          <li key={result.id}>
            {editingId === result.id ? (
              <>
                <input
                  className="lab-input"
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  aria-label="Edit lab result"
                />
                <span className="lab-actions">
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Save ${result.name}`}
                    onClick={() => saveEdit(result.id)}
                  >
                    <Check size={17} aria-hidden="true" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Cancel editing ${result.name}`}
                    onClick={cancelEdit}
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                </span>
              </>
            ) : (
              <>
                <span>{result.name}</span>
                <span className="lab-actions">
                  <button className="icon-button" type="button" aria-label={`Download ${result.name}`}>
                    <Download size={18} aria-hidden="true" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Edit ${result.name}`}
                    onClick={() => beginEdit(result)}
                  >
                    <Pencil size={16} aria-hidden="true" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Delete ${result.name}`}
                    onClick={() => onDelete(result.id)}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LabResults;
