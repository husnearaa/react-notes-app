import { useState, useEffect } from "react";

export default function App() {
  // Single note input
  const [note, setNote] = useState<string>("");

  // List of notes
  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = () => {
    if (!note.trim()) return;
    setNotes([...notes, note]);
    setNote("");
  };

  // Delete a note by index
  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">📝 React Notes App</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <textarea
            className="w-full border border-gray-300 text-black rounded-md p-3 mb-3 outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            placeholder="Write your note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            onClick={addNote}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Add Note
          </button>

          <div className="mt-5 space-y-3">
            {notes.length === 0 ? (
              <p className="text-gray-500 text-center">No notes yet!</p>
            ) : (
              notes.map((n: string, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800 break-all">{n}</p>
                  <button
                    onClick={() => deleteNote(i)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}