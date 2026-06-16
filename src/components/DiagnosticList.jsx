import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const emptyDiagnostic = {
  name: '',
  description: '',
  status: 'Under Observation'
};

const statusOptions = ['Under Observation', 'Cured', 'Inactive', 'Untreated', 'Actively being treated'];

function DiagnosticList({ diagnostics, onAdd, onUpdate, onDelete }) {
  const [form, setForm] = useState(emptyDiagnostic);
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState(emptyDiagnostic);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateEditingForm(field, value) {
    setEditingForm((current) => ({ ...current, [field]: value }));
  }

  function handleAdd(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;

    onAdd({
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status
    });
    setForm(emptyDiagnostic);
  }

  function beginEdit(item) {
    setEditingId(item.id);
    setEditingForm({
      name: item.name,
      description: item.description,
      status: item.status
    });
  }

  function saveEdit(id) {
    if (!editingForm.name.trim() || !editingForm.description.trim()) return;

    onUpdate(id, {
      name: editingForm.name.trim(),
      description: editingForm.description.trim(),
      status: editingForm.status
    });
    setEditingId(null);
    setEditingForm(emptyDiagnostic);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingForm(emptyDiagnostic);
  }

  return (
    <section className="diagnostics card" aria-labelledby="diagnostics-title">
      <div className="section-heading">
        <h2 id="diagnostics-title">Diagnostic List</h2>
      </div>

      <form className="record-form record-form--diagnostic" onSubmit={handleAdd}>
        <label>
          <span>Problem</span>
          <input
            value={form.name}
            onChange={(event) => updateForm('name', event.target.value)}
            placeholder="Diagnosis name"
          />
        </label>
        <label>
          <span>Description</span>
          <input
            value={form.description}
            onChange={(event) => updateForm('description', event.target.value)}
            placeholder="Short clinical description"
          />
        </label>
        <label>
          <span>Status</span>
          <select value={form.status} onChange={(event) => updateForm('status', event.target.value)}>
            {statusOptions.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button className="action-button" type="submit">
          <Plus size={16} aria-hidden="true" />
          Add
        </button>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Problem/Diagnosis</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.map((item) => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  <>
                    <td>
                      <input
                        className="table-input"
                        value={editingForm.name}
                        onChange={(event) => updateEditingForm('name', event.target.value)}
                        aria-label="Edit diagnosis name"
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        value={editingForm.description}
                        onChange={(event) => updateEditingForm('description', event.target.value)}
                        aria-label="Edit diagnosis description"
                      />
                    </td>
                    <td>
                      <select
                        className="table-input"
                        value={editingForm.status}
                        onChange={(event) => updateEditingForm('status', event.target.value)}
                        aria-label="Edit diagnosis status"
                      >
                        {statusOptions.map((status) => (
                          <option value={status} key={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="icon-button"
                          type="button"
                          aria-label={`Save ${item.name}`}
                          onClick={() => saveEdit(item.id)}
                        >
                          <Check size={17} aria-hidden="true" />
                        </button>
                        <button
                          className="icon-button"
                          type="button"
                          aria-label={`Cancel editing ${item.name}`}
                          onClick={cancelEdit}
                        >
                          <X size={17} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="icon-button"
                          type="button"
                          aria-label={`Edit ${item.name}`}
                          onClick={() => beginEdit(item)}
                        >
                          <Pencil size={16} aria-hidden="true" />
                        </button>
                        <button
                          className="icon-button"
                          type="button"
                          aria-label={`Delete ${item.name}`}
                          onClick={() => onDelete(item.id)}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DiagnosticList;
