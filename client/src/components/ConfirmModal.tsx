type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onSubmit,
}: TaskModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Confirm 
        </h2>

        <p>Are you confirm you delete this task</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
