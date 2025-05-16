import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [promiseInfo, setPromiseInfo] = useState({
    resolve: null,
    reject: null,
  });
  const modalRef = useRef(null);

  const confirm = useCallback((msg) => {
    setMessage(msg);
    setIsOpen(true);

    return new Promise((resolve, reject) => {
      setPromiseInfo({ resolve, reject });
    });
  }, []);

  // Focus trapping helper
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
      return;
    }

    if (e.key !== "Tab") return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElem = focusableElements[0];
    const lastElem = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // shift + tab
      if (document.activeElement === firstElem) {
        e.preventDefault();
        lastElem.focus();
      }
    } else {
      // tab
      if (document.activeElement === lastElem) {
        e.preventDefault();
        firstElem.focus();
      }
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus first button when modal opens
      setTimeout(() => {
        const focusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) focusable.focus();
      }, 0);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (promiseInfo.resolve) promiseInfo.resolve(true);
    cleanup();
  };

  const handleCancel = () => {
    if (promiseInfo.reject) promiseInfo.reject(false);
    cleanup();
  };

  const cleanup = () => {
    setIsOpen(false);
    setMessage("");
    setPromiseInfo({ resolve: null, reject: null });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]  bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <div
            className="bg-white rounded-lg p-6 w-80 shadow-lg"
            ref={modalRef}
            tabIndex={-1}
          >
            <div className="flex justify-center mb-4">
              <img src="close.svg" alt="logo" className="w-16 h-16" />
            </div>
            <p
              id="confirm-dialog-description"
              className="text-center font-bold mb-4"
            >
              {message}
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleConfirm}
                className="py-2 px-6 rounded-md text-white bg-red-400"
              >
                حذف
              </button>
              <button
                onClick={handleCancel}
                className="py-2 px-6 rounded-md bg-gray-300 text-gray-800"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
